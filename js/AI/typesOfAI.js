import { GameStateController } from "../gameState/gameStateController.js"
import { AIUtilsController } from "./utils/AIUtils.js"
import { SpecialController } from "../shipUnits/special/specialController.js"
import { WeaponsController } from "../shipUnits/weapons/weaponsController.js"
import { DamageController } from "../damage/damageController.js"
import { VectorController } from "../generalUtils/vector.js"

var GameState = ""
var AIUtils = ""
var Special = ""
var Weapons = ""
var Damage = ""
var Vector = ""

onInit(function(){

    GameState = new GameStateController()
    AIUtils = new AIUtilsController()
    Special = new SpecialController()
    Weapons = new WeaponsController()
    Damage = new DamageController()
    Vector = new VectorController()

})

export class TypeOfAI {

    AItypes = {
        "missileV1": missileV1,
        "missileV2": missileV2,
        "missileV3": missileV3,

        "movable": movable,

        "rotableTurret": rotableTurret,
        "useActivates": useActivates,

        "ship_turret": ship_turret,

        "dummy": dummy,
    }

    getAllTypeOfAI(){
        return this.AItypes
    }

}

function missileV1(object){

    let target = AIUtils.getStepPriorityObjectOfTeams(object)

    object.advanceShip()

    if(!target){return}

    AIUtils.aimToTarget(
        object,
        target,
        object,
    )

}

function missileV2(object){

    let target = AIUtils.getStepPriorityObjectOfTeams(object)

    object.advanceShip()

    if(!target){return}

    AIUtils.aimToTarget( // need overhal
        object,
        AIUtils.getFutureOf(target, 20),
    )

}

function missileV3(object){

    let target = AIUtils.getStepPriorityObjectOfTeams(object)

    object.advanceShip()

    if(!target){return}

    AIUtils.aimToTarget( // need overhal
        object,
        AIUtils.getFutureOf(target, 20),
        AIUtils.getFutureOf(object, 20)
    )

}

function movable(object){

    let target = AIUtils.getStepPriorityObjectOfTeams(object)

    object.advanceShip()

    if(!target){return}

    let distance = AIUtils.getDistanceOfObjects(object, target)
    
    if(distance > 150){
        AIUtils.aimToTarget(object, target)
    }else{
        AIUtils.aimToTarget(object, object, target)
    }
    
}

function rotableTurret(object){

    let target = AIUtils.getStepPriorityObjectOfTeams(object)

    if(!target){return}

    AIUtils.aimToTarget(
        object,
        target
    )

}

function dummy(object){

    let target = AIUtils.getClosestObjectOfTeams(object)

    if(!target){return}

    let distance = AIUtils.getDistanceOfObjects(object, target)

    if(distance < 200){
        object.rotateToLeft()
    }

}

function ship_turret(object){

    // wrong!
    object.x = object.owner.x //+ object.offsetX
    object.y = object.owner.y //+ object.offsetY

    let target = AIUtils.getClosestObjectOfTeams(object)

    if(!target){return}

    AIUtils.aimToTarget(
        object,
        target
    )

    let distance = AIUtils.getDistanceOfObjects(object.owner, target)

    if(object.range > distance){

        object.owner.activate(object.ID)

    }

}

const typesOfActivates = {
    "weapon": useWeapon,
    "factory": useSupport
}

function useWeapon(params){

    let target = AIUtils.getStepPriorityObjectOfTeams(params.object)

    if(!target){return}

    let distance = AIUtils.getDistanceOfObjects(params.object, target)

    if(
        params.activate.range > distance
        &&
        AIUtils.isPointed(params.object, target, 0.999)
    ){
        params.object.activate(params.activate.ID)
    }

}

function useSupport(params){

    if(
        params.activate.owner.energy / params.activate.owner.maxEnergy > 0.8
    ){
        params.object.activate(params.activate.ID)
    }

}

function useActivates(object){

    let allActivates = object.getActivates()

    for(let ID in allActivates){

        let activate = allActivates[ID]

        typesOfActivates[activate.type]({
            object,
            activate,
        })

    }

}