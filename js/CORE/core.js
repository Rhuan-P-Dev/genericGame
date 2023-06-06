/* AI */
import { AIController } from "../AI/AIController.js"

var AI = ""

/* SHIP */
import { ShipCreatorController } from "../ship/shipCreatorController.js"

var ShipCreator = ""

/* KEYBOARD */
import { KeyBoardController } from "../keyboard/keyBoardController.js"

var KeyBoard = ""

/* RULES */
import { RulesController } from "../rules/rulesController.js"

var Rules = ""

/* PHYSICS */
import { PhysicsController } from "../physics/physicsController.js"

var Physics = ""

/* GRAPHICS */
import { ScreenRenderController } from "../graphics/screenRenderController.js"

var ScreenRender = ""

onInit(function(){

    /* AI */

    AI = new AIController()

    /* SHIP */

    ShipCreator = new ShipCreatorController()

    /* KEYBOARD */

    KeyBoard = new KeyBoardController()

    /* RULES */

    Rules = new RulesController()

    /* PHYSICS */

    Physics = new PhysicsController()

    /* GRAPHICS */

    ScreenRender = new ScreenRenderController()

    setTimeout(browseInit,1)
    setTimeout(gameLoop,1)

})

function browseInit(){

    ShipCreator.createShip(true)
    ShipCreator.createShip()
    ShipCreator.createShip()

    KeyBoard.addTriggers()

}

function gameLoop(){

    AI.updateAI()
    Physics.updatePhysics()
    Rules.updateRules()

    ScreenRender.updateRender()

    window.requestAnimationFrame(gameLoop)

}