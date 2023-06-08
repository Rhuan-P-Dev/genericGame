import { GameStateController } from "../gameState/gameStateController.js"
import { TypeOfAI } from "./typesOfAI.js"

var GameState = ""

var AItypes = {}

onInit(function(){

    GameState = new GameStateController()

    AItypes = new TypeOfAI().getAllTypeOfAI()

})

export class AIController {

    updateAI(){
        AI.runAI()
    }

    runAI(){

        let allAI = GameState.getAllAI()

        for(let objectName in allAI){
            let object = allAI[objectName]
            AItypes[object.AI.type](object)
        }
    }

}

var AI = new AIController()