import { GameStateController } from "../gameState/gameStateController.js"
import { TypeOfAI } from "./typesOfAI.js"

var GameState = ""

var AItypes = {}

onInit(function(){

    GameState = new GameStateController()

    AItypes = new TypeOfAI().getAllTypeOfAI()

})

export class AIController {

    update(){

        let allAI = GameState.getAllAI()

        for(let objectName in allAI){
            let object = allAI[objectName]

            object.AI.runAll((node) => {
                AItypes[node.AIType](object)
            })


        }
    }

}

var AI = new AIController()


export class AILinkedList extends LinkedList{

    runAll(callBack){
        let node = this.list.next
        while(1){
            if(!node.next){return true}else{

                callBack(node)

                node = node.next
            }
        }
    }

    returnAll(){
        let tempArray = []
        let node = this.list.next
        while(1){
            if(!node.next){
                return tempArray
            }else{

                tempArray.push(node.AIType)

                node = node.next
            }
        }

    }

}