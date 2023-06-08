import { ShipLogicController } from "../ship/shipLogicController.js"
import { GameStateController } from "../gameState/gameStateController.js"
import { AIUtilsController } from "./utils/AIUtils.js"

var ShipLogic = ""
var GameState = ""
var AIUtils = ""

onInit(function(){

    ShipLogic = new ShipLogicController()
    GameState = new GameStateController()
    AIUtils = new AIUtilsController()

})

export class TypeOfAI {

    AItypes = {
        "missile":missile,
        "mine":mine,
    }

    getAllTypeOfAI(){
        return this.AItypes
    }

}

function missileOLD(object){

    // don't work. :(

    let target = object.AI.target

    let tar_ob_difer_x = object.x - target.x
    let tar_ob_difer_y = object.y - target.y

    let XY = parsePositive(tar_ob_difer_x) + parsePositive(tar_ob_difer_y)

    ShipLogic.fixRotateRight(object)

    let tempXMult = object.xMult
    let tempYMult = object.yMult

    tempXMult -= object.xStepMult
    tempYMult -= object.yStepMult

    let direita_x = (tar_ob_difer_x * tempXMult)
    let direita_y = (tar_ob_difer_y * tempYMult)

    let direita_xy = direita_x + direita_y

    ShipLogic.fixRotateRightLeft(object)

    tempXMult = object.xMult
    tempYMult = object.yMult

    tempXMult += object.xStepMult
    tempYMult += object.yStepMult

    let esquerda_x = (tar_ob_difer_x * tempXMult)
    let esquerda_y = (tar_ob_difer_y * tempYMult)

    let esquerda_xy = esquerda_x + esquerda_y

    //console.log(direita_x)
    //console.log(esquerda_x)

    if(direita_xy < 0){
        //direita_xy = direita_xy - (direita_xy*2)
    }

    if(esquerda_xy < 0){

        //esquerda_xy = esquerda_xy - (direita_xy*2)
    }


    //console.log(direita_xy)
    //console.log(esquerda_xy)


    if(
        esquerda_xy > direita_xy 
    )
    
    {
        //console.log("IR PARA DIREITA")
        ShipLogic.rotateToRight(object)
    }else{
        //console.log("IR PARA ESQUERDA")
        ShipLogic.rotateToLeft(object)
    }

    ShipLogic.advanceShip(object)

    if(XY < 20){
        //qunado o alvo morre, o object continua perseguindo o vestigio do objecto
        GameState.removeObject(target.ID)
        GameState.removeObject(object.ID)
    }

}

function mine(object){

    let allObjects = GameState.getAllObjectsRender()

    for(let objectName in allObjects){
        let target = allObjects[objectName]
        if(target.ID == object.ID || target.team == object.team){continue}

        let tar_ob_difer_x = object.x - target.x
        let tar_ob_difer_y = object.y - target.y

        let XY = parsePositive(tar_ob_difer_x) + parsePositive(tar_ob_difer_y)

        if(XY < object.width*2){
            GameState.removeObject(target)
            GameState.removeObject(object)
        }

    }

}

function missile(object){ // tauvez usar o xMult e yMult para determinar qual lado seguir, ou se o valor for menor que X a pnas AVANÇE

    let allObjectsRender = GameState.getAllObjectsRender()
    let allObjectsTeam = GameState.getAllObjectsTeam()

    for(let objectNameTeam in allObjectsTeam){

        let targetTeam = allObjectsTeam[objectNameTeam]

        for(let objectName in targetTeam){

            let target = targetTeam[objectName]

            if(target.team != object.team && allObjectsRender[target.ID]){

                target = AIUtils.getClosestObject(targetTeam, object)

                let tar_ob_difer_x = object.x - target.x
                let tar_ob_difer_y = object.y - target.y

                let XY = parsePositive(tar_ob_difer_x) + parsePositive(tar_ob_difer_y)

                ShipLogic.fixRotateRight(object)
            
                let tempXMult = object.xMult
                let tempYMult = object.yMult
            
                tempXMult -= object.xStepMult
                tempYMult -= object.yStepMult
            
                let direita_x = (tar_ob_difer_x * tempXMult)
                let direita_y = (tar_ob_difer_y * tempYMult)
            
                let direita_xy = direita_x + direita_y
            
                ShipLogic.fixRotateRightLeft(object)
            
                tempXMult = object.xMult
                tempYMult = object.yMult
            
                tempXMult += object.xStepMult
                tempYMult += object.yStepMult
            
                let esquerda_x = (tar_ob_difer_x * tempXMult)
                let esquerda_y = (tar_ob_difer_y * tempYMult)
            
                let esquerda_xy = esquerda_x + esquerda_y
            
                if(
                    esquerda_xy > direita_xy
                ){
                    ShipLogic.rotateToRight(object)
                }else{
                    ShipLogic.rotateToLeft(object)
                }
            
                ShipLogic.advanceShip(object)
            
                if(XY < 20){
                    GameState.removeObject(target)
                    GameState.removeObject(object)
                }
            
        }

    }

}


}