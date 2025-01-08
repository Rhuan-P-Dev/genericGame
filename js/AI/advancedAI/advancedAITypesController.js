
import { AIUtilsController } from "../utils/AIUtils.js"
import { CoreAIController } from "./coreAIController.js"

var AIUtils
var CoreAI

onInit(function(){

    AIUtils = new AIUtilsController()
    CoreAI = new CoreAIController()

})

export class AdvancedAITypesController {

    typesOfActivates = {
        "weapon": useWeapon,
        "factory": useSupport,
        "special": useSupport,
        "defense": useSupport,
    }

    AItypes = {
        "missileV1": missileV1,
        "flee": flee,
        "movable": movable,
        "escortAlly": escortAlly,
    
        "useActivates": useActivates,

        "rotableTurret": rotableTurret
    }

    get(AIName){
        return this.AItypes[AIName]
    }

    getTypesOfActivates(type){
        return this.typesOfActivates[type]
    }

}

const AdvancedAITypes = new AdvancedAITypesController()

function rotableTurret(object){

    let target = CoreAI.get(object,"offensiveSearch","target", true)

    if(!target){return}

    return {
        "do": (params) => {

            AIUtils.aimToTarget(
                params.object,
                params.target
            )
        },
        "params": {
            object,
            target
        }
    }

}

function useSupport(params){

    return {
        "do": (params) => {
            params.object.activate(params.activate.ID)
            return
            if(
                params.activate.owner.energy / params.activate.owner.maxEnergy > 0.8
            ){
                params.object.activate(params.activate.ID)
            }
        },
        "params": params// will bug?
    }

}

function useActivates(object){

    let allActivates = object.getActivates()

    let resultArray = []

    for(let ID in allActivates){

        let activate = allActivates[ID]

        resultArray.push(
            AdvancedAITypes.getTypesOfActivates(activate.type)({
                object,
                activate,
            })
        )

    }

    return resultArray

}

function useWeapon(params){

    let target = CoreAI.get(params.object,"offensiveSearch","target", true)

    if(!target){return false}

    let distance = CoreAI.get(params.object,"offensiveSearch","distance", true)

    params.target = target
    params.distance = distance

    return {
        "do": (params) => {

            if(
                params.activate.range > params.distance
                &&
                AIUtils.isPointed(params.object, params.target, 0.999)
            ){
                params.object.activate(params.activate.ID)
            }
        },
        "params": params// will bug?
    }

}

function missileV1(object){

    let target = CoreAI.get(object,"offensiveSearch","target", true)

    object.advanceShip()

    if(!target){return false}

    let distance = CoreAI.get(object,"offensiveSearch","distance", true)

    return {
        "do": (params) => {
            AIUtils.aimToTarget(
                params.object,
                params.target,
                params.object,
            )
        },
        "params": {
            "object": object,
            "target": target,
            "distance": distance
        }
    }

}

function escortAlly(object){

    let target = CoreAI.get(object,"allySearch","target", true)

    if(!target){return false}

    let distance = CoreAI.get(object,"allySearch","distance", true)

    object.advanceShip()//?

    return {
        "do": (params, core) => {

            let angle = Math.atan2(
                params.target.y + params.target.currentYVel
                -
                params.object.y + params.object.currentYVel,
                params.target.x + params.target.currentXVel
                -
                params.object.x + params.object.currentXVel
            )

            let newX = params.target.x + Math.cos(angle + Math.PI / 2) * (CLOSE_RANGE / core.approximation)
            let newY = params.target.y + Math.sin(angle + Math.PI / 2) * (CLOSE_RANGE / core.approximation)

            AIUtils.aimToTarget(
                params.object,
                {
                    "x": newX,
                    "y": newY
                }
            )

        },
        "params": {
            "object": object,
            "target": target,
            "distance": distance
        }
    }

}

function movable(object){

    let target = CoreAI.get(object,"offensiveSearch","target", true)

    if(!target){return false}

    let distance = CoreAI.get(object,"offensiveSearch","distance", true)

    object.advanceShip()

    return {
        "do": (params, core) => {

            if(
                params.distance * core.approximation > CLOSE_RANGE
            ){
                AIUtils.aimToTarget(
                    params.object,
                    params.target
                )
            }else{
                AIUtils.aimAwayTarget(
                    params.object,
                    params.target
                )
            }

        },
        "params": {
            "object": object,
            "target": target,
            "distance": distance
        }
    }

}

function flee(object){

    let target = CoreAI.get(object,"fleeSearch","target", true)

    if(!target){return false}

    let distance = CoreAI.get(object,"fleeSearch","distance", true)

    return {
        "do": (params) => {

            object.advanceShip()

            AIUtils.aimAwayTarget(
                params.object,
                params.target
            )
        },
        "params": {
            "object": object,
            "target": target,
            "distance": distance,
        }
    }

}