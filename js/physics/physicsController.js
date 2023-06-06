import { GameStateController } from "../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

})

export class PhysicsController {

    updatePhysics(){
        Physics.physics()
    }

    physics(){

        let allObjectsPhysics = GameState.getAllObjectsPhysics()

        for(let objectName in allObjectsPhysics){
            let object = allObjectsPhysics[objectName]

            Physics.movimentationSimulation(object)

        }
    }

    movimentationSimulation(object){

        object.x += object.currentXVel
        object.y += object.currentYVel

    }

}

var Physics = new PhysicsController()