import { GameStateController } from "../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

})

export class ShipLogicController{

    getPlayer(){
        return  GameState.getObject("player")
    }

    advanceShip(object){
        if(ShipLogic.checkVelocityX(object)){
            ShipLogic.advanceShipX(object)
        }

        if(ShipLogic.checkVelocityY(object)){
            ShipLogic.advanceShipY(object)
        }

    }

    advanceShipX(object){
        object.currentXVel += object.vel * object.xMult
    }

    advanceShipY(object){
        object.currentYVel += object.vel * object.yMult
    }

    rotateToRight(object){

        ShipLogic.fixRotateRight(object)

        object.xMult -= object.xStepMult
        object.yMult -= object.yStepMult

    }

    rotateToLeft(object){

        ShipLogic.fixRotateRightLeft(object)

        object.xMult += object.xStepMult
        object.yMult += object.yStepMult

    }

    fixRotateRight(object){

        if(object.xMult <= -object.xyMultLimit){
            object.xStepMult = -object.stepMult
        }else if(object.xMult >= object.xyMultLimit){
            object.xStepMult = object.stepMult
        }
    
        if(object.yMult <= -object.xyMultLimit){
            object.yStepMult = -object.stepMult
        }else if(object.yMult >= object.xyMultLimit){
            object.yStepMult = object.stepMult
        }

    }

    fixRotateRightLeft(object){
        if(object.xMult <= -object.xyMultLimit){
            object.xStepMult = object.stepMult
        }else if(object.xMult >= object.xyMultLimit){
            object.xStepMult = -object.stepMult
        }
    
        if(object.yMult <= -object.xyMultLimit){
            object.yStepMult = object.stepMult
        }else if(object.yMult >= object.xyMultLimit){
            object.yStepMult = -object.stepMult
        }
    }

    objectExist(object){
        if(object){
            return true
        }else{
            return false
        }
    }

    checkVelocityX(object){

        let currentTempXVel = object.currentXVel

        currentTempXVel += object.vel * object.xMult

        let currentTempXVel_positive = parsePositive(currentTempXVel)
        let currentXVel_positive = parsePositive(object.currentXVel)

        if(currentXVel_positive > currentTempXVel_positive){
            return true
        }

        let softXMult = parsePositive(object.xMult)

        if(parsePositive(object.xMult) == parsePositive(object.yMult)){
            softXMult = 1
        }

        if(
            currentTempXVel < ( -object.maxVel * softXMult )
            ||
            currentTempXVel > ( object.maxVel * softXMult )
        ){
            return false
        }

        return true
    }

    checkVelocityY(object){

        let currentTempYVel = object.currentYVel

        currentTempYVel += object.vel * object.yMult

        let currentTempYVel_positive = parsePositive(currentTempYVel)
        let currentYVel_positive = parsePositive(object.currentYVel)

        if(currentYVel_positive > currentTempYVel_positive){
            return true
        }

        let softYMult = parsePositive(object.yMult)

        if(parsePositive(object.xMult) == parsePositive(object.yMult)){
            softYMult = 1
        }

        if(
            currentTempYVel < ( -object.maxVel * softYMult )
            ||
            currentTempYVel > ( object.maxVel * softYMult )
        ){
            return false
        }

        return true

    }


}

var ShipLogic = new ShipLogicController()