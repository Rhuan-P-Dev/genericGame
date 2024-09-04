
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

    getMinimalObject(
        minimalObject = {},
        object = {}
    ){

        minimalObject.x = object.x || 0
        minimalObject.y = object.y || 0

        minimalObject.ID = "minimal"//randomUniqueID() + "minimal"
        minimalObject.team = object.team || "minimal"

        return minimalObject
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
            (goal.priority - object.searchPriority.targetPriority) + 1
        ) ** object.searchPriority.targetObsession

        let distance = Vector.getTriangleSize(goal, object) * difference

        let multDistance = (
            object.searchPriority.favoriteTargetsObsession[
                goal.ID
            ] || 1
        )

        distance *= multDistance

        return distance

    }

    getDistanceOfObjects(object, goal){

        return Vector.getTriangleSize(object, goal)

    }

    getFutureOf(object, frames = 1){

        return {
            "x": object.x + (object.currentXVel * frames ),
            "y": object.y + (object.currentYVel * frames ),
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

    getAvaregeStats(object, stats = [], aditionalValues = []){

        let avaregeValue = 0
        let avaregeDivision = 0

        for (let index = 0; index < stats.length; index++) {

            let statValue = undefined

            if(!object[stats[index]]){continue}

            if(object[stats[index]].get){
                statValue = object[stats[index]].get()
            }else{
                statValue = object[stats[index]]
            }

            if(
                statValue === undefined
            ){
                continue
            }

            avaregeValue += statValue
            avaregeDivision += 1

        }

        for (let index = 0; index < aditionalValues.length; index++) {

            avaregeValue += aditionalValues[index]
            avaregeDivision += 1

        }

        return (avaregeValue / avaregeDivision) || 0

    }

    getObject(objects, yourObject, method = "closest", stats = []){

        let closestObject = undefined

        let getDistanceFunction = AIUtils.typesOfObjectSearch[method]

        for(let objectName in objects){

            let object = objects[objectName]

            closestObject = {
                "distance": getDistanceFunction(yourObject, object),
                "object": object,
                "avarege": this.getAvaregeStats(
                    object,
                    stats,
                )
            }

            break
            
        }

        for(let objectName in objects){

            let object = objects[objectName]

            let distance = getDistanceFunction(yourObject, object)

            let avarege = this.getAvaregeStats(
                object,
                stats,
            )

            if(
                closestObject.distance > distance
                &&
                closestObject.avarege >= avarege
            ){
                closestObject.distance = distance
                closestObject.object = object
                closestObject.avarege = avarege
            }

        }

        if(closestObject){
            return closestObject.object
        }else{
            return false
        }

    }

    getClosestObjectOfTeams(
        object,
        config = {
            "minPriority": object.searchPriority.min,
            "maxPriority": object.searchPriority.max,
        }
    ){

        let array = AIUtils.returnArrayWithAlllObjectsOfTeams(
            object,
            config
        )

        if(array.length == 0){return false}

        return AIUtils.getObject(array, object, "closest")

    }

    getStepPriorityObjectOfSameTeam(
        object,
        config = {
            "minPriority": object.searchPriority.min,
            "maxPriority": object.searchPriority.max,
            "includeSameTeam": true,
            "includeEnemyTeam": false,
        },
        stats = []
    ){

        let array = AIUtils.returnArrayWithAlllObjectsOfTeams(
            object,
            config
        )

        if(array.length == 0){return false}

        return AIUtils.getObject(array, object, "step", stats)

    }

    getStepPriorityObjectOfTeams(object, stats){

        let array = AIUtils.returnArrayWithAlllObjectsOfTeams(
            object,
            {
                "minPriority": object.searchPriority.min,
                "maxPriority": object.searchPriority.max,
            }
        )

        if(array.length == 0){return false}

        return AIUtils.getObject(array, object, "step", stats)

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

}

var AIUtils = new AIUtilsController()