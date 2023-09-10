import { GameStateController } from "../gameState/gameStateController.js"
import { AIUtilsController } from "./utils/AIUtils.js"
import { SpecialController } from "../shipUnits/special/specialController.js"
import { WeaponsController } from "../shipUnits/weapons/weaponsController.js"
import { DamageController } from "../damage/damageController.js"

var GameState = ""
var AIUtils = ""
var Special = ""
var Weapons = ""
var Damage = ""

onInit(function(){

    GameState = new GameStateController()
    AIUtils = new AIUtilsController()
    Special = new SpecialController()
    Weapons = new WeaponsController()
    Damage = new DamageController()

})

export class TypeOfAI {

    AItypes = {
        "missile": missile,
        "movable": movable,
        "dummy": dummy,
        "missile_v2": missile_v2,
        "turret": turret,
        "ship_turret": ship_turret,
    }

    getAllTypeOfAI(){
        return this.AItypes
    }

}

function missile(object){

    let target = AIUtils.getClosestObjectOfTeams(object)

    object.advanceShip()

    if(!target){return}

    let tar_ob_difer_x = object.x - target.x
    let tar_ob_difer_y = object.y - target.y 

    object.fixRotateRight()

    let tempXMult = object.xMult
    let tempYMult = object.yMult

    tempXMult -= object.xStepMult
    tempYMult -= object.yStepMult

    let direita_x = (tar_ob_difer_x * tempXMult)
    let direita_y = (tar_ob_difer_y * tempYMult)
    
    let direita_xy = direita_x + direita_y

    object.fixRotateLeft()

    tempXMult = object.xMult
    tempYMult = object.yMult

    tempXMult += object.xStepMult
    tempYMult += object.yStepMult

    let esquerda_x = (tar_ob_difer_x * tempXMult)
    let esquerda_y = (tar_ob_difer_y * tempYMult)

    let esquerda_xy = esquerda_x + esquerda_y

    if(esquerda_xy > direita_xy){
        object.rotateToRight()
    }else{
        object.rotateToLeft()
    }

}

function movable(object){

    let target = AIUtils.getStepPriorityObjectOfTeams(object)

    object.advanceShip()

    if(!target){return}

    let tar_ob_difer_x = object.x - target.x
    let tar_ob_difer_y = object.y - target.y 

    let XY = AIUtils.getDistanceOfObjects(object, target)

    object.fixRotateRight()

    let tempXMult = object.xMult
    let tempYMult = object.yMult

    tempXMult -= object.xStepMult
    tempYMult -= object.yStepMult

    let direita_x = (tar_ob_difer_x * tempXMult)
    let direita_y = (tar_ob_difer_y * tempYMult)
    
    let direita_xy = direita_x + direita_y

    object.fixRotateLeft()

    tempXMult = object.xMult
    tempYMult = object.yMult

    tempXMult += object.xStepMult
    tempYMult += object.yStepMult

    let esquerda_x = (tar_ob_difer_x * tempXMult)
    let esquerda_y = (tar_ob_difer_y * tempYMult)

    let esquerda_xy = esquerda_x + esquerda_y

    if(XY > 150){
        if(esquerda_xy > direita_xy){
            object.rotateToRight()
        }else{
            object.rotateToLeft()
        }
    }else{
        if(esquerda_xy < direita_xy){
            object.rotateToRight()
        }else{
            object.rotateToLeft()
        }
    }
}

function dummy(object){

    return

    let target = AIUtils.getStepPriorityObjectOfTeams(object)

    console.log(target)



    return

    //let distance = AIUtils.getDistanceOfObjects(object, target)

    if(distance < 200){
      //  object.rotateToLeft()
    }

}

function missile_v2(object){

    let target = AIUtils.getStepPriorityObjectOfTeams(object)

    object.advanceShip()

    if(!target){return}

    AIUtils.aimToTarget(object, target)

}

function turret(object){

    let target = AIUtils.getStepPriorityObjectOfTeams(object)

    if(!target){return}

    let allWeapons = object.getActivates()

    let distance = AIUtils.getDistanceOfObjects(object, target)

    for(let weaponName in allWeapons){

        let weapon = allWeapons[weaponName]

        if(weapon.range && weapon.range > distance){

            AIUtils.aimToTarget(object, target)
            object.activate(weaponName)
        }else if(
            !weapon.range
            &&
            weapon.owner.energy / weapon.owner.maxEnergy > 0.8
        ){
            object.activate(weaponName)
        }


    }

}

function ship_turret(object){

    if(!object.owner){return}

    object.x = object.owner.x + 0
    object.y = object.owner.y + 0

    let target = AIUtils.getClosestObjectOfTeams(object)

    if(!target){return}

    let distance = AIUtils.getDistanceOfObjects(object.owner, target)

    if(object.range > distance){

        AIUtils.aimToTarget(object, target)

        object.owner.activate(object.ID)

    }

}

/*


function toRadians(graus){
    return ( Math.PI * graus ) / 180
}

function toGraus(rad){
    return 180 / ( Math.PI / rad )
}

function raiz(value){
    return Math.sqrt(value)
}


const PI = Math.PI

let cateto_oposto = 1
let cateto_adj = 1
let hip = raiz(cateto_adj**2 + cateto_oposto**2)

let seno = cateto_oposto / hip
let coseno = cateto_adj / hip
let tangent = cateto_oposto / cateto_adj

//console.log(seno)
//console.log(coseno)
//console.log(tangent)

console.log(PI)

console.log(
    toGraus(PI)
)

*/