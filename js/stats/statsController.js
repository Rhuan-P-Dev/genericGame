
import { GameStateController } from "../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

})

export class StatsController {

    updateStatus(){
        stats.stats()
    }

    stats(){

        let allObjectsStatus = GameState.getAllObjectsStatus()

        for(let objectName in allObjectsStatus){
            let object = allObjectsStatus[objectName]

            stats.calcStatus(object)
            stats.calcActivatesStatus(object)

        }
    }

    calcStatus(object){

        object.life += object.lifeRegen

        if(typeof(object.energy) == "number"){
            object.energy += object.energyRegen
        }

        if(typeof(object.lifeTime) == "number"){
            object.lifeTime -= 1
        }

    }

    calcActivatesStatus(object){

        for(let activateName in object.activates){
            let activate = object.activates[activateName]

            activate.reloadTemp -= activate.reloadStep

        }

    }

}

var stats = new StatsController()