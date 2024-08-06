import { AIUtilsController } from "../AI/utils/AIUtils.js"
import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { CustomMathController } from "../generalUtils/math.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { ExplosionDamage } from "./damageTypes/explosion.js"

var AIUtils = ""
var ScreenRender = ""
var CloneObject = ""

onInit(function(){

    AIUtils = new AIUtilsController()
    ScreenRender = new ScreenRenderController()
    CloneObject = new CloneObjectController()

})

export class DamageController {

    damageTypeTable = {
        "single": this.damageCalc,
        "radius": this.radiusCalc,
    }

    schedulerTypeTable = {
        "linear": this.linear,
        "linearReverse": this.linearReverse,
        "uniform": this.uniform
    }

    addDamage(object, type, amount, force = false) {

        if(!object.damageTypes){
            object.damageTypes = {}
        }

        if(force) {
            object.damageTypes[type] = amount
        }else {
            object.damageTypes[type] = (object.damageTypes[type] || 0) + amount
        }
    }

    addDefense(object, stat, type, amount, force = false) {

        if(!object.defenseTypes[stat]){
            object.defenseTypes[stat] = {}
        }

        if(force) {
            object.defenseTypes[stat][type] = amount
        }else {
            object.defenseTypes[stat][type] = (object.defenseTypes[stat][type] || 0) + amount
        }
        
    }

    addDamageOrder(object, damageType, stat, direction, reference) {
        if (!object.damageOrder[damageType]) {
            object.damageOrder[damageType] = [
                stat
            ]
        }else{
            insertRelativeTo(object.damageOrder[damageType], stat, direction, reference)
        }

    }

    immunityTo(object, stat){

        if(
            object.damageOrder
            &&
            object.damageOrder[stat]
        ){
            delete object.damageOrder[stat]
        }

    }

    doDamage(params){

        this.damageTypeTable[params.object.damageConfig.type](
            params.object,
            params.otherObject
        )

    }

    passDamageMultiplierTable = {
        "dark energy": 0.8,
        "parasite blaster": 0.5
    }

    reciveDamage(params){

        //console.log(params)

        let damageCache = {}

        for(let typeOfDamage in params.otherObject.damageTypes){

            //console.log("typeOfDamage", typeOfDamage)

            for(let typeOfDamagedStatsIndex in params.object.damageOrder[typeOfDamage]){

                let typeOfDamagedStats = params.object.damageOrder[typeOfDamage][typeOfDamagedStatsIndex]

                //console.log("typeOfDamagedStats", typeOfDamagedStats)

                if(
                    params.object[typeOfDamagedStats] === undefined
                    ||
                    this.isNegative(params.object, typeOfDamagedStats)
                    ||
                    params.calcDamage <= 0
                    ||
                    damageCache[typeOfDamage] <= 0
                ){continue}

                let damage = undefined
                let defenseMultiplier = 0

                if(
                    params.object.defenseTypes[typeOfDamagedStats]
                    &&
                    params.object.defenseTypes[typeOfDamagedStats][typeOfDamage]
                ){
                    defenseMultiplier = params.object.defenseTypes[typeOfDamagedStats][typeOfDamage]
                }

                damage = damageCache[typeOfDamage] || params.calcDamage

                damage *= params.otherObject.damageTypes[typeOfDamage] || 0
                
                damage *= params.object.resistance
                
                damage -= params.object.defense * defenseMultiplier

                if(
                    damage <= 0
                ){
                    damageCache[typeOfDamage] = damage
                    continue
                }

                //console.log("damage", damage)

                let statNumber = undefined

                if(typeof params.object[typeOfDamagedStats] == "number"){
                    statNumber = params.object[typeOfDamagedStats]
                    params.object[typeOfDamagedStats] -= damage
                }else{
                    statNumber = params.object[typeOfDamagedStats].get()
                    params.object[typeOfDamagedStats].math("-", damage)
                }

                if(
                    (params.otherObject.passDamageMultiplier || this.passDamageMultiplierTable[typeOfDamage])
                    &&
                    (!params.object.defenseTypes[typeOfDamagedStats] || !params.object.defenseTypes[typeOfDamagedStats][typeOfDamage])
                ){

                    damage = damage * (
                        (params.otherObject.passDamageMultiplier || 0)
                        +
                        (this.passDamageMultiplierTable[typeOfDamage] || 0)
                    )
                    statNumber = 0

                }

                damageCache[typeOfDamage] = damage - statNumber

            }

        }

        //a

    }

    isNegative(object, typeOfDamagedStats){

        let number = undefined

        if(typeof object[typeOfDamagedStats] == "number"){
            number = object[typeOfDamagedStats]
        }else{
            number = object[typeOfDamagedStats].get()
        }

        if(number < 0){
            return true
        }else{
            return false
        }

    }

    damageCalc(attacker, victim){

        let damage = attacker.damage
        let bokedDamage = attacker.damage

        if(attacker.original){
            attacker = attacker.original
        }

        let master = attacker

        while(master.owner){

            master = master.owner

        }

        victim.onDamage.run({
            "otherObjectMaster": master,
            "otherObject": attacker,
            "object": victim,
            "damage": bokedDamage,
            "calcDamage": damage,
        })

    }

    radiusCalc(attacker){

        ScreenRender.addDrawRequest(
            {
                "func":ScreenRender.drawCircle,
                "params":{
                    "x": attacker.x,
                    "y": attacker.y,
                    "radius": attacker.damageConfig.range,
                },
            }
        )

        let allEnemyObject = AIUtils.returnArrayWithAlllObjectsOfTeams(
            attacker,
            {
                "maxDistance": attacker.damageConfig.range,
            }
        )

        for (let index = 0; index < allEnemyObject.length; index++) {

            let victim = allEnemyObject[index]

            let attackerBoked = Damage.schedulerTypeTable[attacker.damageConfig.scheduler](
                attacker,
                victim
            )

            Damage.damageCalc(attackerBoked, victim)
            
        }

    }

    boke(object){
    
        let boke = CloneObject.cloneSimple(object)

        boke.original = object

        return boke

    }

    linear(attacker, victim){

    }

    linearReverse(attacker, victim){

        let attackerBoked = Damage.boke(attacker)
        //let victimBoked = Damage.boke(victim)

        let mult = new CustomMathController().linearReverse(
            AIUtils.getDistanceOfObjects(attacker, victim),
            attacker.damageConfig.range,
        )

        mult += new CustomMathController().linear(
            attacker.width,
            attacker.damageConfig.range
        )

        mult += new CustomMathController().linear(
            victim.width,
            attacker.damageConfig.range
        )

        if(mult > 1){
            mult = 1
        }

        attackerBoked.damage *= mult

        return attackerBoked

    }

    uniform(attacker, victim){

        return Damage.boke(attacker)

    }

    explosionDamageShell(object){

        let shell = {}

        shell.damageConfig = new ExplosionDamage().damageConfig
        
        shell.damage = object.damage

        shell.ID = object.ID
        shell.team = object.team

        shell.width = object.width
        
        shell.x = object.x
        shell.y = object.y

        return shell

    }

}

var Damage = new DamageController()