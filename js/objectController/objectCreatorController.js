import { GameStateController } from "../gameState/gameStateController.js"
import { MovableObject } from "../object/movableObject.js"
import { WeaponLessShip } from "../object/weaponLessShip.js"
import { ShipLogicController } from "../ship/shipLogicController.js"

var GameState = ""
var ShipLogic = ""

onInit(function(){

    GameState = new GameStateController()
    ShipLogic = new ShipLogicController()

})

export class ObjectCreatorController{

    mainCanvas = document.getElementById("mainCanvas")

    giveObjectAI(object, AI){
        object.AI = AI
        return object
    }

    makeObjectInPlayerControl(object){
        object.ID = "player"
        object.color = "green"
        return object
    }

    createMissile(object){

        let newShip = new WeaponLessShip()

        newShip.ID = randomUniqueID()

        newShip.width /= 2
        newShip.height /= 2
        newShip.maxVel *= 2
        newShip.team = object.team
        newShip.x = object.x
        newShip.y = object.y

        newShip.color = "white"

        newShip.AI = {}

        newShip.AI.type = "missile"

        GameState.addObject(newShip, true)

    }

    createPipi(object){

        let ball = new MovableObject()

        ball.width /= 3
        ball.height /= 3
        ball.x = object.x
        ball.y = object.y
        ball.team = object.team
        ball.ID = randomUniqueID()

        ball.currentXVel = (ball.vel * object.xMult) * 20
        ball.currentYVel = (ball.vel * object.yMult) * 20

        ball.AI = {}

        ball.AI.type = "mine"

        GameState.addObject(ball, true)

    }

}

var ObjectCreator = new ObjectCreatorController()