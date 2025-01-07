import { setFrameOut } from "../frame/frameController.js"
import { GameStateController } from "../gameState/gameStateController.js"
import { CoreAIBuilderController } from "./advancedAI/coreAIBuilderController.js"
import { CoreAIController } from "./advancedAI/coreAIController.js"
import { TypeOfAI } from "./typesOfAI.js"

var GameState = ""
var AItypes = {}
var CoreAI
var CoreAIBuilder

onInit(function(){

    GameState = new GameStateController()

    AItypes = new TypeOfAI().getAllTypeOfAI()
    CoreAI = new CoreAIController()
    CoreAIBuilder = new CoreAIBuilderController()

})

const excludeAI = {}

export class AIController {

    removeExclusion(object){
        if(excludeAI[object.ID]){
            delete excludeAI[object.ID]
        }
    }

    addExclusion(object){
        excludeAI[object.ID] = true
    }

    toggleAI(object, disableFramesOut) {

        if(
            object.AI === undefined
            ||
            object.ID == GameState.getPlayer().ID // this will give the player a little advantage
        ){return}

        this.addExclusion(object)

        setFrameOut(
            () => {
                if(
                    GameState.getObject(object.ID)
                ){
                    AIC.removeExclusion(object)
                }else{
                    AIC.addExclusion(object)
                }
            },
            disableFramesOut,
            1,
            true,
            object.ID + "_enabling AI..."
        )
    }

    update(){

        let allAI = GameState.getAllAI()

        for(let objectName in allAI){
            let object = allAI[objectName]

            if(excludeAI[object.ID]){continue}

            if(object.AI.runAll){
                object.AI.runAll((node) => {
                    AItypes[node.value](object)
                })
            }else{
                CoreAI.think(
                    object, object.AI
                )
            }

        }
    }

    giveAI(object, AI, recreateAIList = false){
        
        if(!object.AI || recreateAIList){
            object.AI = new AILinkedList()
        }

        AI.forEach(AIType => {
            object.AI.add(AIType)
        })
        
        return object
    }

    giveCoreAI(object, AI, coreType, recreateAIList = false){

        CoreAIBuilder.build(coreType)

        object.coreType = coreType

        if(!object.AI || recreateAIList){
            object.AI = []
        }

        AI.forEach(AIType => {
            object.AI.push(AIType)
        })
        
        return object
    }

}

var AIC = new AIController()

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

                tempArray.push(node.value)

                node = node.next
            }
        }

    }

}