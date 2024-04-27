import { AIController } from "../AI/AIController.js"
import { EffectsController } from "../effects/effectsController.js"
import { FrameController } from "../frame/frameController.js"
import { GameStateController } from "../gameState/gameStateController.js"
import { MultiplyStatsController } from "../generalUtils/multiplyStats.js"
import { KeyBoardController } from "../keyboard/keyBoardController.js"
import { Ship } from "../object/complex/ship.js"
import { ObjectActivatesController } from "../objectController/objectActivatesController.js"
import { SpecialController } from "../shipUnits/special/specialController.js"

var GameState = ""
var ObjectActivates = ""
var AIC = ""
var KeyBoard = ""

onInit(function(){

    GameState = new GameStateController()
    ObjectActivates = new ObjectActivatesController()
    AIC = new AIController()
    KeyBoard = new KeyBoardController()

})

export class ShipCreatorController{

    mainCanvas = document.getElementById("mainCanvas")

    createShip(team, AI, isPlayer){

        let newShip = ShipCreator.createShipFactory()

        newShip.team = team

        let haveAI = false

        if(team == "neutralTeam"){

            ObjectActivates.giveActivate(newShip, "weapon")
            ObjectActivates.giveActivate(newShip, "weapon")

            newShip = AIC.giveAI(newShip, AI)
            haveAI = true

        }

        if(AI && !isPlayer && team != "neutralTeam"){
            newShip = AIC.giveAI(newShip, AI)
            haveAI = true

            ObjectActivates.giveActivate(newShip, "weapon")
            ObjectActivates.giveActivate(newShip)
            ObjectActivates.giveActivate(newShip)

        }

        if(isPlayer){

            newShip = KeyBoard.makeObjectInPlayerControl(newShip)

            ObjectActivates.giveActivate(newShip, "weapon")
            ObjectActivates.giveActivate(newShip, "defense")
            ObjectActivates.giveActivate(newShip, "factory")
            ObjectActivates.giveActivate(newShip, "special")

            //new EffectsController().add(
            //    "burn",
            //    "effect",
            //    {
            //        "object": newShip,
            //    },
            //)

            newShip = AIC.giveAI(newShip, AI)
            haveAI = false

        }

        GameState.addObject(newShip, haveAI)

        return newShip

    }

    createShipFactory(){

        let newShip = new Ship(true)

        newShip.ID = randomUniqueID()
        newShip.x = randomInteger(0, ShipCreator.mainCanvas.width)
        newShip.y = randomInteger(0, ShipCreator.mainCanvas.height)

        return newShip

    }

}

var ShipCreator = new ShipCreatorController()