import { GenericEffectsScorerController } from "./generic/genericEffectsScorerController.js"
import { OtherEffectsScorerController } from "./other/otherEffectsScorerController.js"

var OtherEffectsScorer
var GenericEffectsScorer

onInit(function(){

    OtherEffectsScorer = new OtherEffectsScorerController()
    GenericEffectsScorer = new GenericEffectsScorerController()

})

export class EffectsScorerController {

    baseCost = 50000*2

    get(effectName, type, calc = true) {
        const mult = (
            (GenericEffectsScorer.get(effectName, type)-1)
            ||
            (OtherEffectsScorer.get(effectName, type)-1)
            ||
            undefined
        )

        if(calc){
            return mult * this.baseCost
        }else{
            return mult
        }

    }

    tryGet(effectName, type, calc = true){

        //return (
        //    this.get(effectName, "type", calc)
        //)

        return (
            this.get(effectName, "effect", calc)
            ||
            this.get(effectName, "onDamage", calc)
            ||
            this.get(effectName, "onHit", calc)
            ||
            this.get(effectName, "onDeath", calc)
            ||
            this.get(effectName, "onKill", calc)
        )
    }

    getAll(visualizer = false) {

        if(visualizer){
            return [
                ...GenericEffectsScorer.getAll(visualizer).map((item) => [item[0], parseInt((item[1]-1) * this.baseCost)]),
                ...OtherEffectsScorer.getAll(visualizer).map((item) => [item[0], parseInt((item[1]-1) * this.baseCost)]),
            ]
        }else{
            return [
                ...GenericEffectsScorer.getAll(visualizer).map((item) => [item[0], item[1], item[2], parseInt((item[3]-1) * this.baseCost)]),
                ...OtherEffectsScorer.getAll(visualizer).map((item) => [item[0], item[1], item[2], parseInt((item[3]-1) * this.baseCost)]),
            ]
        }
        
    }

    getRandom(quantity = 1){
        
        let allEffects = this.getAll()

        if (allEffects.length === 0) {
            return undefined
        }

        let result = []

        for (let index = 0; index < quantity; index++) {

            result.push(
                returnRandomArray(
                    allEffects
                )
            )
            
        }
        
        return result
    }

}