
import { AIUtilsController } from "../AI/utils/AIUtils.js"
import { DamageController } from "../damage/damageController.js"
import { GameStateController } from "../gameState/gameStateController.js"

var GameState = ""
var AIUtils = ""
var Damage = ""

onInit(function(){

    GameState = new GameStateController()
    AIUtils = new AIUtilsController()
    Damage = new DamageController()

})

export class PhysicsController {

    update(){

        let allObjectsPhysics = GameState.getAllObjectsPhysics()

        for(let objectName in allObjectsPhysics){
            let object = allObjectsPhysics[objectName]

            Physics.movimentationSimulation(object)
            Physics.colisonSimulation(object)

        }
    }

    movimentationSimulation(object){

        object.x += object.currentXVel
        object.y += object.currentYVel

    }

    colisonSimulation(object){

        let allObjects = AIUtils.returnArrayWithAlllObjectsOfTeams(
            object
        )

        for (let index = 0; index < allObjects.length; index++) {

            let currentObject = allObjects[index]
         
            let distance = AIUtils.getDistanceOfObjects(object, currentObject)
            
            if(distance < object.width + currentObject.width){
                
                object.onHit.run({
                    "object": object,
                    "otherObject": currentObject,
                })

                //currentObject.onHit.run({
                //    "object": currentObject,
                //    "otherObject": object,
                //})

            }

        }

    }

}

var Physics = new PhysicsController()