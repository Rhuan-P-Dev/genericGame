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
        "mine": mine,
        "replicator": replicator,
        "bot": bot,
        "movable": movable,
        "dummy": dummy,
        "missile_v2": missile_v2,
        "turret": turret,
        "robo": robo,
        "ship_turret": ship_turret,
        "missile_v3": missile_v3,
        "movable_v2": movable_v2,
        "turret_v2": turret_v2,
    }

    getAllTypeOfAI(){
        return this.AItypes
    }

}

function mine(object){

    let target = AIUtils.getClosestObjectOfTeams(object)

    let distance = AIUtils.getDistanceOfObjects(object, target)

    if(distance < object.width*1.5 + target.width*1.5){
        Damage.damage(object, target)
        GameState.removeObject(object)
    }

}

function missile(object){

    let target = AIUtils.getClosestObjectOfTeams(object)

    object.advanceShip()

    if(!target){return}

    let tar_ob_difer_x = object.x - target.x
    let tar_ob_difer_y = object.y - target.y 

    let distancia = AIUtils.getDistanceOfObjects(object, target)

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

    if(distancia < object.width*2){
        Damage.damage(object, target)
        GameState.removeObject(object)
    }

}

function replicator(object){ //delet

    object.AI.remove("replicator")

    Special.makeWeakClone(object)

    setTimeout( () => {
        object.AI.add("replicator")
    }, 100)

}

function bot(object){

    //object.AI.remove("bot")

    let target = AIUtils.getClosestObjectOfTeams(object)

    if(!target){return}

    let allWeapons = object.getActivates()

    let distance = AIUtils.getDistanceOfObjects(object, target)

    for(let weaponName in allWeapons){

        let weapon = allWeapons[weaponName]

        if(weapon.range > distance){
            AIUtils.aimToTarget(object, target)
            object.activate(weaponName)
        }

    }

    setTimeout( () => {
      //  object.AI.add("bot")
    }, 6500)

}

function movable(object){

    let target = AIUtils.getClosestObjectOfTeams(object)

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

    let target = AIUtils.getClosestObjectOfTeams(object)

    let distance = AIUtils.getDistanceOfObjects(object, target)

    if(distance < 200){
        object.rotateToLeft()
    }

}

function missile_v2(object){

    let target = AIUtils.getClosestObjectOfTeams(object)

    object.advanceShip()

    if(!target){return}

    let distancia = AIUtils.getDistanceOfObjects(object, target)

    let cateto_opost = target.y - object.y
    let cateto_adj = target.x - object.x

    object.xMult = cateto_adj / distancia
    object.yMult = cateto_opost / distancia

    if(distancia < object.width*2 + target.width*2){
        Damage.damage(object, target)
        GameState.removeObject(object)
    }

}

function turret(object){

    let target = AIUtils.getClosestObjectOfTeams(object)

    if(!target){return}

    let allWeapons = object.getActivates()

    let distance = AIUtils.getDistanceOfObjects(object, target)

    for(let weaponName in allWeapons){

        let weapon = allWeapons[weaponName]

        if(weapon.range > distance){
            AIUtils.aimToTarget(object, target)
            object.activate(weaponName)
        }

    }

}

function ship_turret(object){

    if(!object.owner){return}

    object.x = object.owner.x + 5
    object.y = object.owner.y + 1

    let target = AIUtils.getClosestObjectOfTeams(object.owner)

    if(!target){return}

    let distance = AIUtils.getDistanceOfObjects(object.owner, target)

    if(object.range > distance){

        AIUtils.aimToTarget(object, target)

        object.owner.activate(object.ID)

    }


}

function robo(object){

    let target = AIUtils.getClosestObjectOfTeams(object)

    if(!target){return}

    let allWeapons = object.getActivates()

    let distance = AIUtils.getDistanceOfObjects(object, target)

    for(let weaponName in allWeapons){

        let weapon = allWeapons[weaponName]

        if(weapon.range > distance){
            AIUtils.aimToTarget(object, target)
            object.activate(weaponName)
        }

    }
}

function missile_v3(object){

    let target = AIUtils.getClosestPriorityObjectOfTeams(object)

    object.advanceShip()

    if(!target){return}

    let distancia = AIUtils.getDistanceOfObjects(object, target)

    let cateto_opost = target.y - object.y
    let cateto_adj = target.x - object.x

    object.xMult = cateto_adj / distancia
    object.yMult = cateto_opost / distancia

    if(distancia < object.width*2 + target.width*2){
        Damage.damage(object, target)
        GameState.removeObject(object)
    }

}

function movable_v2(object){

    let target = AIUtils.getClosestPriorityObjectOfTeams(object)

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

function turret_v2(object){

    let target = AIUtils.getClosestPriorityObjectOfTeams(object)

    if(!target){return}

    let allWeapons = object.getActivates()

    let distance = AIUtils.getDistanceOfObjects(object, target)

    for(let weaponName in allWeapons){

        let weapon = allWeapons[weaponName]

        if(weapon.range > distance){
            AIUtils.aimToTarget(object, target)
            object.activate(weaponName)
        }

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