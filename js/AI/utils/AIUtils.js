
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
        return parsePositive(object.x - goal.x) + parsePositive(object.y - goal.y)
    }

}

var AIUtils = new AIUtilsController()