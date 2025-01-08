
export class GenericEffectsScorerController {

    effectsScore = {

        // applying it in your ship
        "positive": {

            "bounty search": {

               "effect": 3

            },

            "the blessed effect: special": {

                "effect": 3,
                "onHit": 3,
                "onDamage": 3,
                "onDeath": 3,
                "onKill": 2.5,

            },

            "devour": {

                "effect": 20,

                "onHit": 9,
                "onDamage": 10,
                "onDeath": 1.1,
                "onKill": 8,

            },

            "the blessed effect: red":{

                "effect": 2,
                "onHit": 1.9,
                "onDamage": 2,
                "onDeath": 1.1,
                "onKill": 1.8,

            },

            "attraction": {

                "effect": 1.1,
                "onHit": 1.05,
                "onDamage": 1.05,
                "onDeath": 1.01,
                "onKill": 1.025,

            },

            "the blessed effect: reverse": {

                "effect": 3,
                //"onHit": 1.25, BUG?
                //"onDamage": 1.25, BUG????????????
                "onDeath": 1.1,

            },

            "breathe": {

                "effect": 1.15,
                "onHit": 1.05,
                "onDamage": 1.05,
                "onDeath": 1.01,
                "onKill": 1.025,

            },

            "heart beat": {
                "effect": 1.2,
                "onHit": 1.08,
                "onDamage": 1.08,
                "onDeath": 1.01,
                "onKill": 1.05,
            },

            "evolutron": {

                "effect": 5,
                "onHit": 3,
                "onDamage": 3.5,
                "onDeath": 1.1,
                "onKill": 2,

            },

            "second stage": {
                "effect": 3,
                "onHit": 6,
                "onDamage": 6,
                "onDeath": 6,
                "onKill": 6,
            },

            "clone v1": {
                "effect": 5,
                "onHit": 5,
                "onDamage": 5,
                "onDeath": 4,
                "onKill": 5,
            },

            "clone v0.5": {
                "effect": 2.7,
                "onHit": 2.7,
                "onDamage": 2.7,
                "onDeath": 2.7,
                "onKill": 2.7,
            },

            "illusion v1": {
                "effect": 1.15,
                "onHit": 1.15,
                "onDamage": 1.15,
                "onDeath": 1.01,
                "onKill": 1.05,
            },

            "slowdown area": {
                "effect": 1.3,
                "onHit": 1.1,
                "onDamage": 1.1,
                "onDeath": 1.01,
                "onKill": 1.08,
            },

            "untouchable": {
                "effect": 1.25,
                "onHit": 1.025,
                "onDamage": 1.025,
                "onDeath": 1.01,
                "onKill": 1.01,
            },

            "deflet area": {
                "effect": 1.5,
                "onHit": 2,
                "onDamage": 1.9,
                "onDeath": 1.1,
                "onKill": 1.8,
            },

            "help": {
                "effect": 1.25,
                "onHit": 1.5,
                "onDamage": 1.5,
                "onDeath": 1.35,
                "onKill": 1.4,
            },

            "missile cluster": {
                "effect": 5,
                "onHit": 5,
                "onDamage": 5,
                "onDeath": 5,
                "onKill": 4.9,
            },

            "small bullet cluster": {
                "effect": 5,
                "onHit": 5,
                "onDamage": 5,
                "onDeath": 5,
                "onKill": 4.9,
            },

            "safe perimeter pack": {
                "effect": 1.4,
                "onHit": 1.4,
                "onDamage": 1.4,
                "onDeath": 1.4,
                "onKill": 1.4,
            },

            "purpleShip's breakdown": {
                "effect": 2,
                "onHit": 3,
                "onDamage": 2.5,
                "onDeath": 2,
                "onKill": 2.25,
            },

            "selfSwarmMotherShip's death": {
                "effect": 5,
                "onHit": 5,
                "onDamage": 5,
                "onDeath": 5,
                "onKill": 5,
            },

            "minor divine wrath": {
                "effect": 8,
                "onHit": 8,
                "onDamage": 8,
                "onDeath": 8,
                "onKill": 8,
            },

            "divine wrath": {
                "effect": 20,
                "onHit": 20,
                "onDamage": 20,
                "onDeath": 20,
                "onKill": 20,
            },

            "try add star": {
                "effect": 20,
                "onHit": 20,
                "onDamage": 20,
                "onDeath": 20,
                "onKill": 20,
            },

            "mrD's death": {
                "effect": 15,
                "onHit": 15,
                "onDamage": 15,
                "onDeath": 10,
                "onKill": 15,
            },

            "mrD's last ally's": {
                "effect": 10
            },

            "zombies horde": {
                "effect": 8,
                "onHit": 8,
                "onDamage": 8,
                "onDeath": 6,
                "onKill": 7.5,
            },

            "reaper's death pulse": {
                "effect": 20,
                "onHit": 4,
                "onDamage": 4,
                "onDeath": 3,
                "onKill": 3.5,
            },

            "queen's war call": {
                "effect": 10,
                "onHit": 10,
                "onDamage": 10,
                "onDeath": 1.1,
                "onKill": 8,
            },

            "royalty scout": {
                "effect": 8,
                "onHit": 8,
                "onDamage": 8,
                "onDeath": 5,
                "onKill": 8,
            },

            "royalty guard": {
                "effect": 15,
                "onHit": 15,
                "onDamage": 15,
                "onDeath": 10,
                "onKill": 15,
            },

            "action fight": {
                "effect": 20,
                "onHit": 20,
                "onDamage": 20,
                "onDeath": 20,
                "onKill": 20,
            },

            "action mercy": {
                "effect": 20,
                "onHit": 20,
                "onDamage": 20,
                "onDeath": 20,
                "onKill": 20,
            },

            "one for all": {
                "effect": 10,
            },

            "inspiration": {
                "effect": 5,
                "onHit": 10,
                "onDamage": 15,
                "onDeath": 4,
                "onKill": 12,
            },

            "redemption of the heart": {
                "effect": 15,
            },

            "reaper's final invitation": {
                "onDeath": 30,
            },

            "reaper's whispers of souls": {
                "onKill": 10,
            },

            "slime's death": {
                "onDeath": 2,
            },

            "infinite replicant": {
                "effect": 30,
                "onHit": 27,
                "onDamage": 27,
                "onDeath": 3,
                "onKill": 27,
            },

            "frontal snowball storm": {
                "effect": 5,
            },

            "investor soul": {
                "effect": 20,
            }

        },

        // applying to an enemy ship
        // INFINITY USE!
        "negative": {
            
            "shock": {

                "onHit": 1.75,
                "onDamage": 3.5,

            },

            "death hand": {

                "onHit": 10,
                "onDamage": 20,

            },

            "burn": {
                "onHit": 1.5,
                "onDamage": 3,
            },

            "parasite tesla coil": {
                "onHit": 10,
                "onDamage": 20,
            },

            "the blessed effect: blue": {
                "onHit": 6,
                "onDamage": 10,
            },

        }

    }

    get(effectName, type){

        if(
            this.effectsScore["positive"][effectName]
            &&
            this.effectsScore["positive"][effectName][type]
        ){
            return this.effectsScore["positive"][effectName][type]
        }

        if(
            this.effectsScore["negative"][effectName]
            &&
            this.effectsScore["negative"][effectName][type]
        ){
            return this.effectsScore["negative"][effectName][type]
        }

        return undefined
    }

    getAll(visualizer = false){
        let result = []
        for (let deBuff in this.effectsScore) {
            for (let effectName in this.effectsScore[deBuff]) {
                let effect = this.effectsScore[deBuff][effectName]
                for (let key in effect) {
                    let value = effect[key]
                    if(visualizer){
                        result.push([effectName + " - " + deBuff + " - " + key, value])
                    }else{
                        result.push([effectName, deBuff, key, value])
                    }
                }
            }
        }
        return result
    }

    haveThis(effectName){
        let isGeneric = (
            this.get(effectName, "effect")
            ||
            this.get(effectName, "onDamage")
            ||
            this.get(effectName, "onHit")
            ||
            this.get(effectName, "onDeath")
            ||
            this.get(effectName, "onKill")
        )

        if(isGeneric){
            return true
        }else{
            return false
        }

    }

}