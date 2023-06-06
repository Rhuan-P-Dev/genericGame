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

        }
    }

    screenRules(object){

        if(object.x < 0 || object.x > Rules.mainCanvas.offsetWidth){
            object.currentXVel -= object.currentXVel*2.01
        }

        if(object.y < 0 || object.y > Rules.mainCanvas.offsetHeight){
            object.currentYVel -= object.currentYVel*2.01
        }

    }

}

var Rules = new RulesController()