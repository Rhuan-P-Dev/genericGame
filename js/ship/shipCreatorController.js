import { GameStateController } from "../gameState/gameStateController.js"
import { ship } from "../object/ship.js"
import { ObjectActivatesController } from "../objectController/objectActivatesController.js"
import { ObjectCreatorController } from "../objectController/objectCreatorController.js"
import { ShipLogicController } from "../ship/shipLogicController.js"

var GameState = ""
var ShipLogic = ""
var ObjectCreator = ""
var ObjectActivates = ""

onInit(function(){

    GameState = new GameStateController()
    ShipLogic = new ShipLogicController()
    ObjectCreator = new ObjectCreatorController()
    ObjectActivates = new ObjectActivatesController()

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

        ObjectActivates.giveOffensiveActivate(newShip)

        GameState.addObject(newShip, haveAI)

        return newShip

    }

    createShipFactory(){

        let newShip = new ship()

        newShip.ID = randomUniqueID()
        newShip.x = randomInteger(0, ShipCreator.mainCanvas.width)
        newShip.y = randomInteger(0, ShipCreator.mainCanvas.height)

        return newShip

    }

}

var ShipCreator = new ShipCreatorController()