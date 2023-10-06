
import { GameStateController } from "../../gameState/gameStateController.js"
import { CloneObjectController } from "../../generalUtils/cloneObject.js"
import { CustomMathController } from "../../generalUtils/math.js"
import { VectorController } from "../../generalUtils/vector.js"

var GameState = ""
var CustomMath = ""
var Vector = ""
var CloneObject = ""

onInit(function(){

    GameState = new GameStateController()
    CustomMath = new CustomMathController()
    Vector = new VectorController()
    CloneObject = new CloneObjectController()

})

export class AIUtilsController {

    typesOfObjectSearch = {
        "closest": this.getDistanceOfObjects,
        "step": this.getStepDistanceOfObjects,
    }

    getStepDistanceOfObjects(object, goal){

        // The greater the difference, the lower the priority
        // Difference = goal.priority - object.searchPriority.targetPriority

        /* > TargetObsession <
        higher values:
        will determine if the object will chase objects with smaller difference
        OR
        smaller values:
        will determine if the object will chase objects with smaller distance
        */

        let targetObsession = 6

        let difference = parsePositive(
            goal.priority - object.searchPriority.targetPriority
        ) ** targetObsession

        return Vector.getTriangleSize(goal, object) * difference

    }

    getDistanceOfObjects(object, goal){

        return Vector.getTriangleSize(object, goal)

    }

    getFutureOf(object, frames = 1){

        return {
            "x": (object.x + object.cosine) + (object.currentXVel * frames ),
            "y": (object.y + object.sine) + (object.currentYVel * frames ),
        }

    }

    getPointed(object, target){

        let frontOfObject = {
            "x": object.x + object.cosine,
            "y": object.y + object.sine,
        }

        let frontOfObjectVectorNormalize = Vector.vectorNormalize(frontOfObject, object)

        let toTargetVectorNormalize = Vector.vectorNormalize(
            target,
            object
        )

        let product = Vector.scalarProduct(
            frontOfObjectVectorNormalize, toTargetVectorNormalize
        )

        return product

    }

    isPointed(object, target, precision = 0.9999){

        let product = this.getPointed(object, target)

        if(product > precision){
            return true
        }else{
            return false
        }

    }

    pointToTarget(object, target){

        let direction = Vector.vectorNormalize(object, target)
    
        object.xMult = direction.x
        object.yMult = direction.y

    }

    aimToTarget(object, target, objectCalcs = object){

        if(this.isPointed(object, target)){return}

        let toTargetVectorNormalize = Vector.vectorNormalize(
            target,
            objectCalcs
        )

        let hypotheticalObject = CloneObject.cloneEngine(
            object
        )

        hypotheticalObject.rotateToRight()

        let right = {
            "x": objectCalcs.x + hypotheticalObject.cosine,
            "y": objectCalcs.y + hypotheticalObject.sine,
        }

        hypotheticalObject.rotateToLeft() // to cancel the previous rotate

        hypotheticalObject.rotateToLeft()

        let left = {
            "x": objectCalcs.x + hypotheticalObject.cosine,
            "y": objectCalcs.y + hypotheticalObject.sine,
        }

        let rightProduct = Vector.scalarProduct(
            toTargetVectorNormalize,
            Vector.vectorNormalize(right, objectCalcs)
        )

        let leftProduct = Vector.scalarProduct(
            toTargetVectorNormalize,
            Vector.vectorNormalize(left, objectCalcs)
        )

        if(rightProduct > leftProduct){
            object.rotateToRight()
        }else{
            object.rotateToLeft()
        }

    }

    getObject(objects, yourObject, method = "closest"){

        let closestObject = undefined

        let getDistanceFunction = AIUtils.typesOfObjectSearch[method]

        for(let objectName in objects){

            let object = objects[objectName]

            closestObject = {
                "distance": getDistanceFunction(yourObject, object),
                "object": object,
            }

            break
            
        }

        for(let objectName in objects){

            let object = objects[objectName]

            let distance = getDistanceFunction(yourObject, object)

            if(closestObject.distance > distance){
                closestObject.distance = distance
                closestObject.object = object
            }

        }

        if(closestObject){
            return closestObject.object
        }else{
            return false
        }

    }

    getClosestObjectOfTeams(object){

        let array = AIUtils.returnArrayWithAlllObjectsOfTeams(
            object,
            {
                "minPriority": object.searchPriority.min,
                "maxPriority": object.searchPriority.max,
            }
        )

        if(array.length == 0){return false}

        return AIUtils.getObject(array, object, "closest")

    }

    getStepPriorityObjectOfTeams(object){

        let array = AIUtils.returnArrayWithAlllObjectsOfTeams(
            object,
            {
                "minPriority": object.searchPriority.min,
                "maxPriority": object.searchPriority.max,
            }
        )

        if(array.length == 0){return false}

        return AIUtils.getObject(array, object, "step")

    }

    returnArrayWithAlllObjectsOfTeams(
        object,
        config = {
            "includeSameTeam": false,
            "includeEnemyTeam": true,
            "includeYourself": false,
            "minPriority": undefined,
            "maxPriority": undefined,
            "minDistance": undefined,
            "maxDistance": undefined,
        }
    ){

        let allObjectsTeam = GameState.getAllObjectsTeam()

        let array = []

        for(let objectNameTeam in allObjectsTeam){

            if(
                !config.includeSameTeam
                ||
                config.includeSameTeam == undefined
            ){
                if(objectNameTeam == object.team){continue}
            }

            if(
                !config.includeEnemyTeam
                &&
                config.includeEnemyTeam != undefined
            ){
                if(objectNameTeam != object.team){continue}
            }

            let targetTeam = allObjectsTeam[objectNameTeam]

            if(Object.keys(targetTeam).length == 0){continue}

            for(let newObjectName in targetTeam){

                let newObject = targetTeam[newObjectName]


                if(
                    !config.includeYourself
                    ||
                    config.includeYourself == undefined
                ){
                    if(newObject.ID == object.ID){continue}
                }

                if(
                    newObject.priority < config.minPriority
                    ||
                    newObject.priority > config.maxPriority
                    ||
                    AIUtils.getDistanceOfObjects(object, newObject) < config.minDistance
                    ||
                    AIUtils.getDistanceOfObjects(object, newObject) > config.maxDistance
                ){
                    continue
                }
                
                array.push(newObject)
                
            }

        }

        return array

    }

    getClosestPriorityObjectOfTeams(object){

        let result = this.buildPriorityObjectOfTeams(object)

        let arrayObjects = result.returnQueueR(object.searchPriority)

        if(!arrayObjects){return false}

        return this.getClosestObject(arrayObjects, object)

    } // useless?

    buildPriorityObjectOfTeams(object, sameTeam = true){

        let allObjectsTeam = GameState.getAllObjectsTeam()

        let result = new CustomPriorityQueue()

        for(let objectNameTeam in allObjectsTeam){

            if(!sameTeam){
                if(objectNameTeam == object.team){continue}
            }

            let targetTeam = allObjectsTeam[objectNameTeam]

            if(Object.keys(targetTeam).length == 0){continue}

            for(let objectName in targetTeam){

                let currentObject = targetTeam[objectName]

                if(!object.searchPriority.above){

                    if(currentObject.priority > object.searchPriority.targetPriority){
                        continue
                    }

                }

                if(!object.searchPriority.below){

                    if(currentObject.priority < object.searchPriority.targetPriority){
                        continue
                    }

                }

                result.add(
                    currentObject,
                    currentObject.priority
                )

            }

        }

        return result

    } // useless?

}

var AIUtils = new AIUtilsController()

class queue{

    list = {
        next:{}
    }

    add(value){
        let node = this.list.next
        while(1){
            if(!node.next){
                
                node.value = value
                node.next = {}

                node.next.previous = node

                return true
            }else{
                node = node.next
            }
        }
    }
    
} // useless?

class CustomPriorityQueue {

    list = []

    add(value, priority){

        if(!this.list[priority]){

            this.list[priority] = new queue()

        }

        this.list[priority].add(value)

    }

    getAllQueue(){
        return this.list
    }

    returnQueue(priority){

        let queue = this.list[priority]

        if(queue){
            return this.convertQueueToArray(queue.list.next)
        }else{
            return false
        }

    }

    returnQueueR(searchPriority){

        let queue = undefined
        let priority = searchPriority.targetPriority
        let loop = searchPriority.ifDontHave.all
        let value = searchPriority.ifDontHave.first
        
        while(true){

            queue = this.returnQueue(priority)

            if(queue){return queue}

            if(
                priority + value < searchPriority.min
                ||
                priority + value > searchPriority.max
            ){

                if(loop){
                    loop = false
                }else{
                    return false
                }

                value = this.inverter(value)

            }

            priority += value

        }

    }

    convertQueueToArray(queue){

        let array = []

        while(true){

            if(!queue.next){

                return array

            }else{
                array.push(queue.value)
                queue = queue.next
            }

        }

    }

    inverter(number){ // Math

        console.log("OBSOLETE!")

        return number - number * 2

    }


} // useless?