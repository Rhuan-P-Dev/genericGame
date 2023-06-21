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

            object.AI.runAll((node) => {
                AItypes[node.AIType](object)
            })


        }
    }

}

var AI = new AIController()


export class AILinkedList{

    list = {
        next:{}
    }

    add(value){
        let node = this.list.next
        while(1){
            if(!node.next){
                
                node.AIType = value
                node.next = {}

                return true
            }else{
                node = node.next
            }
        }
    }
    
    remove(value){
        let node = this.list.next
        let tail = this.list
        while(1){
            if(!node.next){return false}

            if(value == node.AIType){

                if(node.next.next){
                    node.AIType = node.next.AIType
                    node.next = node.next.next
                }else{
                    tail.next = {}
                }

                return true
            }else{
                tail = node
                node = node.next
            }
        }
    }

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