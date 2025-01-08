import { FactoryInfoController } from "../../../js/shipUnits/factory/info/factoryInfoController.js"
import { WeaponsInfoController } from "../../../js/shipUnits/weapons/info/weaponsInfoController.js"
import { ObjectsScorerController } from "../objectsScorerController.js"
import { ScorerController } from "./scorerController.js"

var WeaponsInfo
var FactoryInfo
var Scorer
var ObjectsScorer

onInit(function(){

    WeaponsInfo = new WeaponsInfoController()
    FactoryInfo = new FactoryInfoController()
    Scorer = new ScorerController()
    ObjectsScorer = new ObjectsScorerController()

})

export class FactoryScorerController {

    activatesScorer(factory){

        let score = 0

        for (let type in factory.config.activates) {

            for (let index = 0; index < factory.config.activates[type].length; index++) {

                let activateName = factory.config.activates[type][index]

                score += Scorer.get(type, activateName)

            }

        }

        return score

    }

    factoryMult = {
        "mini yourself 1": 10
    }

    scorer(factory){

        let score = ((6000*3) * 3) * 1.5

        score += factory.cost
        score += factory.reload

        score *= Math.max(
            factory.cost / 100,
            1
        )
        
        score += this.activatesScorer(factory)

        let factoryObjectName = undefined

        if(factory.config.objectClass){
            factoryObjectName = (new (factory.config.objectClass)).constructor.name
        }

        if(factoryObjectName){
            //console.log(factoryObjectName)
            //console.log(factoryObjectName.constructor.name)
            score *= ObjectsScorer.getObjectMult(factoryObjectName)
        }
        //score *= factoryObjectName ? ObjectsScorer.getObjectMult(factoryObjectName) : 1
        
        console.error(
            //ObjectsScorer.get()
        )

        if(factory.config.statsMult !== undefined){
            score *= factory.config.statsMult+1
        }

        if(
            factory.effects
            &&
            factory.effects.length !== 0
        ){
            score *= (factory.effects.length*2) + 2
        }

        score *= this.factoryMult[factory.name] || 1


        //console.log(factory)

        return score

    }

    get(factoryName){

        if(this.ignoreRandom){
            return 0
        }

        return factoryName == "random" ? this.getAverage() : this.scorer(FactoryInfo.build(factoryName))
    }

    getAll(){

        let scores = []

        let factorys = FactoryInfo.buildAll()

        for(let factory of factorys){

            let factoryName = factory.name

            scores.push(
                [
                    factoryName,
                    parseInt(this.scorer(factory))
                ]
            )

        }

        return scores
    }

    getAverageCACHE = undefined

    ignoreRandom = false

    getAverage() {
        if(this.getAverageCACHE !== undefined){
            return this.getAverageCACHE
        }
        this.ignoreRandom = true
        const scores = this.getAll()
        const totalScore = scores.reduce((sum, [_, score]) => sum + score, 0)
        const averageScore = totalScore / scores.length
        this.getAverageCACHE = averageScore
        this.ignoreRandom = false
        return averageScore
    }
}