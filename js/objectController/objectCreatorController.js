import { AILinkedList } from "../AI/AIController.js"
import { GameStateController } from "../gameState/gameStateController.js"
import { KeyBoardController } from "../keyboard/keyBoardController.js"
import { WeaponsController } from "../shipUnits/weapons/weaponsController.js"

var GameState = ""
var KeyBoard = ""

onInit(function(){

    GameState = new GameStateController()
    KeyBoard = new KeyBoardController()

})

export class ObjectCreatorController{ // rename

    giveObjectAI(object, AI, recreateAIList = false){
        if(!object.AI || recreateAIList){
            object.AI = new AILinkedList()
        }

        AI.forEach(AIType => {
            object.AI.add(AIType)
        })
        
        return object
    }

    makeObjectInPlayerControl(object){
        object.ID = "player"
        object.color = "green"

        GameState.setPlayer(object)

        KeyBoard.addObjectInPlayerControl(object)

        return object

    }

}

var ObjectCreator = new ObjectCreatorController()