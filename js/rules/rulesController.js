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
            Rules.activatesRules(object)

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

        if(object.life > object.maxLife){
            object.life = object.maxLife
        }

        if(object.energy > object.maxEnergy){
            object.energy = object.maxEnergy
        }

        if(object.life <= 0){
            GameState.removeObject(object)
        }

        if(typeof(object.lifeTime) == "number"){
         
            if(object.lifeTime <= 0){
                GameState.removeObject(object)
            }

        }


    }

    activatesRules(object){

        for(let activateName in object.activates){
            let activate = object.activates[activateName]

            if(activate.reloadTemp < 0){
                activate.reloadTemp = 0
            }

        }

    }

}

var Rules = new RulesController()