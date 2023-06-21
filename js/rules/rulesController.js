import { GameStateController } from "../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

})

export class RulesController {

    mainCanvas = document.getElementById("mainCanvas")

    updateRules(){
        Rules.rules()
    }

    rules(){

        let allObjectsRules = GameState.getAllObjectsRules()

        for(let objectName in allObjectsRules){
            let object = allObjectsRules[objectName]

            Rules.screenRules(object)
            Rules.statsRules(object)

        }
    }

    screenRules(object){

        if(object.x < 0){
            object.x = Rules.mainCanvas.offsetWidth - object.width
        }

        if(object.x > Rules.mainCanvas.offsetWidth){
            object.x = object.width
        }

        if(object.y < 0){
            object.y = Rules.mainCanvas.offsetHeight - object.height
        }

        if(object.y > Rules.mainCanvas.offsetHeight){
            object.y = object.height
        }

    }

    statsRules(object){

        object.life += object.lifeRegen

        if(object.life > object.maxLife){
            object.life = object.maxLife
        }

        object.energy += object.energyRegen

        if(object.energy > object.maxEnergy){
            object.energy = object.maxEnergy
        }

        if(object.life <= 0){
            GameState.removeObject(object)
        }

        if(object.lifeTime){

            object.lifeTime -= 1

            if(object.lifeTime <= 0){
                GameState.removeObject(object)
            }

        }

    }

}

var Rules = new RulesController()