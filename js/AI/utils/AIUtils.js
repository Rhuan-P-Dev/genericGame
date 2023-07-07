
import { GameStateController } from "../../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

})

export class AIUtilsController {

    prioritysDontHaveFucnions = {

    }

    getClosestObject(objects, yourObject){

        let closestObject = undefined

        for(let objectName in objects){

            closestObject = {"distance": AIUtils.getDistanceOfObjects(objects[objectName], yourObject),
                             "object": objects[objectName]}
            break
        }

        for(let objectName in objects){

            let object = objects[objectName]

            //console.log(object.typeOfObject)

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

    aimToTarget(object, target){

        let distance = AIUtils.getDistanceOfObjects(object, target)

        let distanceY = target.y - object.y
        let distanceX = target.x - object.x
    
        object.xMult = distanceX / distance
        object.yMult = distanceY / distance

    }

    getClosestPriorityObjectOfTeams(object){

        let allObjectsTeam = GameState.getAllObjectsTeam()

        let result = new CustomPriorityQueue()

        for(let objectNameTeam in allObjectsTeam){

            if(objectNameTeam == object.team){continue}

            let targetTeam = allObjectsTeam[objectNameTeam]

            if(Object.keys(targetTeam).length == 0){continue}

            for(let objectName in targetTeam){

                let currentObject = targetTeam[objectName]

                if(!object.prioritys.above){

                    if(currentObject.prioritys.priority > object.prioritys.targetPriority){
                        continue
                    }

                }

                if(!object.prioritys.below){

                    if(currentObject.prioritys.priority < object.prioritys.targetPriority){
                        continue
                    }

                }

                result.add(
                    currentObject,
                    currentObject.prioritys.priority
                )

            }

        }

        let arrayObjects = result.getQueueR(
            object.prioritys.targetPriority,
            object.prioritys.ifDontHave,
        )

        if(!arrayObjects){ return false}

        return this.getClosestObject(arrayObjects, object)

        /*
        ifDontHave: {
            first: "left",
            all: true,
        },
        */

        /*
        prioritys = {
            priority: 0,
            targetPriority: 5,
            above: true,
            below: true,
        }
        */

        return false

        if(Object.keys(closestObjectOfEachTeamSamePriority).length == 0){

            let dontHave = object.prioritys.dontHave
           
            if(object.prioritys[dontHave]){

                this.prioritysDontHaveFucnions[dontHave](object)

            }

            
        }

        //AIUtils.getClosestPriorityObject(closestObjectOfEachTeam, object)

        //return AIUtils.getClosestPriorityObject(closestObjectOfEachTeam, object)

    }

}

var AIUtils = new AIUtilsController()




/*

CADA OBJETO TERA UM PRIORIDADE

QUANTO MAIOR FOR O NUMERO MAIOR SERA A PRIORIDADE

PARGUNTAS????!!!!!

APARTIR DE QUAL NUMERO??

SE NÃO TIVER O QUE EU QUERO FAÇO OQUE? O MAIS PROXIMO? NADA?






























*/

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
    
}

class CustomPriorityQueue {

    list = []

    add(value, priority){

        if(!this.list[priority]){

            this.list[priority] = new queue()

        }

        this.list[priority].add(value)

    }

    getQueue(priority){

        let queue = this.list[priority]

        if(queue){
            return this.convertQueueToArray(queue.list.next)
        }else{
            return false
        }

    }

    getQueueR(priority, ifDontHave){

        let queue = undefined

        let loop = ifDontHave.all

        let value = ifDontHave.first
        
        while(true){

            queue = this.getQueue(priority)

            if(queue){return queue}

            if(
                priority + value < 0
                ||
                priority + value > 10
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

        return number - number * 2

    }


}