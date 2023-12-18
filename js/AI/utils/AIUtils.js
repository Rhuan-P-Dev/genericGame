
import { GameStateController } from "../../gameState/gameStateController.js"
import { CloneObjectController } from "../../generalUtils/cloneObject.js"
import { VectorController } from "../../generalUtils/vector.js"

var GameState = ""
var Vector = ""
var CloneObject = ""

onInit(function(){

    GameState = new GameStateController()
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

        let difference = parsePositive(
            goal.priority - object.searchPriority.targetPriority
        ) ** object.searchPriority.targetObsession

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

    isInObjectAngle(object, otherObject, angle, angleDistortion = 0){

        let angleL = Vector.toRadians(-angle)
        let angleR = Vector.toRadians(angle)
        let objectAngle = Vector.sumAngles(
            object.getAngle()
            +
            Vector.toRadians(angleDistortion)
        )
    
        let diffR = angleR + objectAngle
        let diffL = angleL + objectAngle
    
        let otherObjectAngle = Vector.vectorNormalize(
            otherObject,
            object,
        )
    
        otherObjectAngle = Vector.getAngle(
            otherObjectAngle.y,
            otherObjectAngle.x,
        )
    
        if(
            diffL < otherObjectAngle
            &&
            diffR > otherObjectAngle
        ){

            return true
        
        }else{

            return false

        }
    
    }

    returnProduct(direction, object, target, objectCalcs = object, velPercentage = 100){

        let rotateFuncName = "rotateTo" + direction

        let toTargetVectorNormalize = Vector.vectorNormalize(
            target,
            objectCalcs
        )

        let hypotheticalObject = CloneObject.cloneEngine(
            object
        )

        let rotationVel = hypotheticalObject.getPercentageOfCurrentRotationVel(
            velPercentage
        )

        hypotheticalObject[rotateFuncName](rotationVel)

        let directionObject = {
            "x": objectCalcs.x + hypotheticalObject.cosine,
            "y": objectCalcs.y + hypotheticalObject.sine,
        }

        return Vector.scalarProduct(
            toTargetVectorNormalize,
            Vector.vectorNormalize(directionObject, objectCalcs)
        )

    }

    returnRightProduct(object, target, objectCalcs = object, velPercentage = 100){

        return this.returnProduct("Right", object, target, objectCalcs, velPercentage)

    }

    returnLeftProduct(object, target, objectCalcs = object, velPercentage = 100){

        return this.returnProduct("Left", object, target, objectCalcs, velPercentage)

    }

    returnLeftRightProduct(object, target, objectCalcs = object, velPercentage = 100){

        return {
            "rightProduct": this.returnRightProduct(object, target, objectCalcs, velPercentage),
            "leftProduct": this.returnLeftProduct(object, target, objectCalcs, velPercentage),
        }
    }

    aimAwayTarget(object, target, objectCalcs = object){

        if(this.isPointed(object, target)){return}

        let products = this.returnLeftRightProduct(object, target, objectCalcs)

        if(products.rightProduct < products.leftProduct){
            object.rotateToRight()
        }else{
            object.rotateToLeft()
        }

    }

    aimToTarget(object, target, objectCalcs = object){

        if(this.isPointed(object, target)){return}

        let products = this.returnLeftRightProduct(object, target, objectCalcs)

        if(products.rightProduct > products.leftProduct){
            object.rotateToRight()
        }else{
            object.rotateToLeft()
        }

    }

    preciseAimToTarget(object, target, objectCalcs = object){

        let products50 = this.returnLeftRightProduct(object, target, objectCalcs, 50)

        if(products50.rightProduct > products50.leftProduct){

            let products100 = this.returnLeftRightProduct(object, target, objectCalcs, 100)

            if(products100.rightProduct > products50.rightProduct){

                object.rotateToRight()

            }else{

                let products1 = this.returnLeftRightProduct(object, target, objectCalcs, 1)

                if(products1.rightProduct > products50.rightProduct){

                    object.rotateToRight(
                        object.getPercentageOfCurrentRotationVel(
                            1
                        )
                    )

                }else{
                    object.rotateToRight(
                        object.getPercentageOfCurrentRotationVel(
                            50
                        )
                    )
                }

            }

        }else{

            let products100 = this.returnLeftRightProduct(object, target, objectCalcs, 100)

            if(products100.leftProduct > products50.leftProduct){

                object.rotateToLeft()

            }else{

                let products1 = this.returnLeftRightProduct(object, target, objectCalcs, 1)

                if(products1.leftProduct > products50.leftProduct){

                    object.rotateToLeft(
                        object.getPercentageOfCurrentRotationVel(
                            1
                        )
                    )

                }else{
                    object.rotateToLeft(
                        object.getPercentageOfCurrentRotationVel(
                            50
                        )
                    )
                }

            }

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

    returnArrayWithAlllObjectsOfTeams( // create a cache, think! same params of request use cache!
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