
export class OtherEffectsScorerController {

    effectsScore = {

        // applying it in your ship
        "positive": {

            "deny damage": {

                "onHit": 20,
                "onDamage": 20,
                "onDeath": 20,

            },

            "converter": {
                "onHit": 10,
            },

            "energy shield of faith": {
                "onDamage": 3,
            },

            "energy barrier": {
                "onDamage": 1.5,
            },

            "counterback": {
                "onDamage": 2,
            },

            "resurrection": {
                "onDeath": 2,
            },

            "defense evolution": {
                "onDamage": 5,
            },
            
            "harm to good": {
                "onDamage": 30,
            },

        },

        // applying to an enemy ship
        // INFINITY USE!
        "negative": {

            "fragile": {

                "onHit": 5,
                "onDamage": 10,

            },

            "scrapper": {

                "onHit": 4,
                "onDamage": 6,

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
        let isOther = (
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

        if(isOther){
            return true
        }else{
            return false
        }

    }

}