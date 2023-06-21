
import { GameStateController } from "../../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

})

export class AIUtilsController {

    getClosestObject(objects, yourObject){

        let closestObject = undefined

        for(let objectName in objects){

            closestObject = {"distance": AIUtils.getDistanceOfObjects(objects[objectName], yourObject),
                             "object": objects[objectName]}
            break
        }

        for(let objectName in objects){

            let object = objects[objectName]

            let distance = AIUtils.getDistanceOfObjects(object, yourObject)

            if(closestObject.distance > distance){
                closestObject.distance = distance
                closestObject.object = object
            }

        }

        return closestObject.object

    }

    getDistanceOfObjects(object, goal){

        return Math.sqrt( ( ( object.x - goal.x ) ** 2 ) + ( ( object.y - goal.y ) ** 2 ) )
    }

    getDistanceOfObjects_x(object, goal){

        return Math.sqrt( ( object.x - goal.x ) ** 2 )

    }

    getDistanceOfObjects_y(object, goal){

        return Math.sqrt( ( object.y - goal.y ) ** 2 )

    }

    getClosestObjectOfTeams(object){

        let allObjectsTeam = GameState.getAllObjectsTeam()

        let closestObjectOfEachTeam = {}

        for(let objectNameTeam in allObjectsTeam){

            if(objectNameTeam == object.team){continue}

            let targetTeam = allObjectsTeam[objectNameTeam]

            if(Object.keys(targetTeam).length == 0){continue}

            let closetObject = AIUtils.getClosestObject(targetTeam, object)

            closestObjectOfEachTeam[closetObject.ID] = closetObject

        }

        if(Object.keys(closestObjectOfEachTeam).length == 0){return false}
        
        return AIUtils.getClosestObject(closestObjectOfEachTeam, object)

    }

}

var AIUtils = new AIUtilsController()