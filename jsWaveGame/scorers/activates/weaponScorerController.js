import { WeaponsInfoController } from "../../../js/shipUnits/weapons/info/weaponsInfoController.js"
import { WeaponsModifiersController } from "../../../js/shipUnits/weapons/modifiers/weaponsModifiersController.js"
import { EffectsScorerController } from "../effects/effectsScorerController.js"

var WeaponsInfo
var WeaponsModifiers
var EffectsScorer

onInit(function(){

    WeaponsInfo = new WeaponsInfoController()
    WeaponsModifiers = new WeaponsModifiersController()
    EffectsScorer = new EffectsScorerController()

})

export class WeaponScorerController {

    specialScorer = {
        "laser": (weapon, score) => {

            score += weapon.cost
            score += weapon.reload

            score *= Math.max(
                weapon.range / 40,
                1
            )

            score *= weapon.lifeTime*2 || 2

            return score
        },
        "big laser": (weapon, score) => {
            return this.specialScorer["laser"](weapon, score)
        },
        "death laser": (weapon, score) => {
            return this.specialScorer["laser"](weapon, score)
        },
        "big death laser": (weapon, score) => {
            return this.specialScorer["laser"](weapon, score)
        },
        "ink laser": (weapon, score) => {
            return this.specialScorer["laser"](weapon, score)
        },
        //"guided laser": (weapon, score) => {
        //    return this.specialScorer["laser"](weapon, score)
        //},
        "big guided laser": (weapon, score) => {
            return this.specialScorer["laser"](weapon, score)
        },
    }

    typeProjectileMult = {
        "small bullet": 0.9,
        "medium bullet": 1.5,
        "simple missile": 2,
        "black hole": 10,
        "simple mine": 3,
        "mini world": 4,
        "explosive small bullet": 1.25,
        "explosive medium bullet": 2.5,
        "death's hand": 5,
        "empty color": 10,
        "laser": 3,
        "big laser": 7,
        "bone": 4,
        "death laser": 6,
        "big death laser": 12,
        "ink drop": 3,
        "ink laser": 4,
        "small snow bullet": 1.5,
        "medium snow bullet": 2,
        "guided laser": 2.5,
        "big guided laser": 5,
    }

    scoreProjectiles(weapon, score){

        weapon.config.projectiles?.objectClass.forEach(projectile => {
            score *= this.typeProjectileMult[projectile]

        })

        return score

    }

    scoreProjectilesActivates(weapon, score){

        for (let index in weapon.config.projectiles?.activates) {

            let weaponArray = weapon.config.projectiles.activates[index].weapon

            if(!weaponArray){continue}

            for (let indey = 0; indey < weaponArray.length; indey++) {
                
                score += this.get(
                    weaponArray[indey]
                )
                
            }
            
        }

        return score

    }

    scoreDamageTypes(weapon, score){

        for (let damageType in weapon.damageTypes) {
            score *= weapon.damageTypes[damageType] + 1
        }

        return score

    }

    consumableStat = {
        "darkEnergy": 3,
        "divineEnergy": 6,
        "actionPoints": 10,
    }

    scoreConsumableStat(weapon, score){

        score *= this.consumableStat[weapon.consumableStat] || 1

        return score

    }

    scoreModifiers(weapon, score){

        weapon.modifiersList.forEach(modifier => {

            let mult = WeaponsModifiers.getMult(
                WeaponsModifiers.get(modifier, true)
            )

            if(mult !== undefined){
                if(
                    mult >= 1
                ){
                    score *= mult + 1
                }else{
                    score *= mult
                }
            }

        })

        return score

    }

    scoreEffects(weapon, score){

        for (let index = 0; index < weapon.effects.length; index++) {

            const metaEffect = weapon.effects
            const effect = metaEffect[0].effect.config.name
            const type = metaEffect[0].effect.config.type

            // imperfect
            score *= EffectsScorer.tryGet(
                effect,
                type,
                false
            )

        }

        return score
    }

    scorer(weapon){

        let score = 1

        score += weapon.cost
        score += weapon.range
        score += weapon.lifeTime || 1
        score += weapon.reload

        weapon.config.projectiles?.objectClass.forEach(projectile => {
            if(this.specialScorer[projectile]){
                score = this.specialScorer[projectile](weapon, score)
            }
        })

        score = this.scoreProjectilesActivates(weapon, score)

        score = this.scoreProjectiles(weapon, score)

        score = this.scoreDamageTypes(weapon, score)

        score = this.scoreConsumableStat(weapon, score)

        score *= Math.max(
            (weapon.config.weapon?.damageMult) || 1,
            1
        )
        
        score *= Math.max(
            (weapon.config.weapon?.multVel / 5) || 1,
            1
        )

        score *= (weapon.config.projectiles?.objectClass.length) || 1

        if(
            weapon.modifiersList
            &&
            weapon.modifiersList.length !== 0
        ){
            score = this.scoreModifiers(weapon, score)
        }

        if(
            weapon.effects
            &&
            weapon.effects.length !== 0
        ){
            score = this.scoreEffects(weapon, score)
        }

        if(weapon.homing){
            score *= 4
        }

        score *= Math.max(
            weapon.cost / 100,
            1
        )
        
        if(weapon.auto){
            score *= 1.25
        }

        return score

    }

    get(weaponName){
        if(weaponName === "random"){
            return this.getAverage()
        }else{
            return this.scorer(WeaponsInfo.build(weaponName, false))
        }
    }

    getAll(){

        let scores = []

        let weapons = WeaponsInfo.buildAll(false)

        for(let weapon of weapons){

            let weaponName = weapon.name

            if(weapon.auto){
                weaponName = "auto " + weaponName
            }

            scores.push(
                [
                    weaponName,
                    parseInt(this.scorer(weapon))
                ]
            )

        }

        return scores
    }

    getAverageCACHE = undefined

    getAverage() {
        if(this.getAverageCACHE !== undefined){
            return this.getAverageCACHE
        }
        const scores = this.getAll()
        const totalScore = scores.reduce((sum, [_, score]) => sum + score, 0)
        const averageScore = totalScore / scores.length
        this.getAverageCACHE = averageScore
        return averageScore
    }
}
