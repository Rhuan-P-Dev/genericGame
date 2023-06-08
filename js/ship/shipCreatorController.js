import { GameStateController } from "../gameState/gameStateController.js"
import { MovableObject } from "../object/movableObject.js"
import { WeaponLessShip } from "../object/weaponLessShip.js"
import { ObjectCreatorController } from "../objectController/objectCreatorController.js"
import { ShipLogicController } from "../ship/shipLogicController.js"

var GameState = ""
var ShipLogic = ""
var ObjectCreator = ""

onInit(function(){

    GameState = new GameStateController()
    ShipLogic = new ShipLogicController()
    ObjectCreator = new ObjectCreatorController()

})

export class ShipCreatorController{

    mainCanvas = document.getElementById("mainCanvas")

    createShip(team, AI, isPlayer){

        let newShip = ShipCreator.createShipFactory()

        newShip.team = team

        let haveAI = false

        if(AI){
            newShip = ObjectCreator.giveObjectAI(newShip, AI)
            haveAI = true
        }

        if(isPlayer){
            newShip = ObjectCreator.makeObjectInPlayerControl(newShip)
        }

        GameState.addObject(newShip, haveAI)

    }

    createShipFactory(){

        let newShip = new WeaponLessShip()

        newShip.ID = randomUniqueID()
        newShip.x = randomInteger(0,ShipCreator.mainCanvas.width)
        newShip.y = randomInteger(0,ShipCreator.mainCanvas.height)

        return newShip

    }

}

var ShipCreator = new ShipCreatorController()