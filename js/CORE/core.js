/* AI */
import { AIController } from "../AI/AIController.js"

var AI = ""

/* OBJECT CONTROLLER */
import { ObjectCreatorController } from "../objectController/objectCreatorController.js"

var ObjectCreator = ""

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

/* HUD */
import { HUDController } from "../graphics/HUDController.js"

var HUD = ""

/* GRAPHICS */
import { ScreenRenderController } from "../graphics/screenRenderController.js"

var ScreenRender = ""

onInit(function(){

    /* AI */

    AI = new AIController()

    /* OBJECT CONTROLLER */

    ObjectCreator = new ObjectCreatorController()

    /* SHIP */
    ShipCreator = new ShipCreatorController()

    /* KEYBOARD */

    KeyBoard = new KeyBoardController()

    /* RULES */

    Rules = new RulesController()

    /* PHYSICS */

    Physics = new PhysicsController()

    /* HUD */

    HUD = new HUDController()

    /* GRAPHICS */

    ScreenRender = new ScreenRenderController()

    setTimeout(browseInit,1)
    setTimeout(gameLoop,1)

})

function browseInit(){

    ShipCreator.createShip("playerTeam", false, true)
    //ShipCreator.createShip("playerTeam", ["turret"]).color = "blue"
    //ShipCreator.createShip("neutralTeam", ["robo"]).color = "red"
    //ShipCreator.createShip("enemyTeam", ["dummy"])
    //ShipCreator.createShip("enemyTeam", ["missile_v2", "mine"])
    //ShipCreator.createShip("enemyTeam", ["robo"])
    //ShipCreator.createShip("enemyTeam", ["raio", "dummy", "missile"])
    //ShipCreator.createShip("enemyTeam", ["movable"])
    ShipCreator.createShip("enemyTeam", ["bot"])

    setInterval(() => {
        //ShipCreator.createShip("enemyTeam", ["bot", "movable"])
        //ShipCreator.createShip("enemyTeam", ["movable"])
        //ShipCreator.createShip("enemyTeam", ["mine"])
        //ShipCreator.createShip("enemyTeam", ["missile"])
        //ShipCreator.createShip("enemyTeam", ["raio", "dummy"])
    }, 500)

    KeyBoard.addTriggers()

}

function gameLoop(){

    KeyBoard.runCommands()

    AI.updateAI()
    Physics.updatePhysics()
    Rules.updateRules()

    HUD.updateHUD()

    ScreenRender.updateRender()

    window.requestAnimationFrame(gameLoop)

}