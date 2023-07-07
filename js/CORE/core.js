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

/* STATS */
import { StatsController } from "../stats/statsController.js"

var stats = ""

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

    /* STATS */

    stats = new StatsController()

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

    //ShipCreator.createShip("enemyTeam", ["movable", "turret"]).color = "red"

    ShipCreator.createShip("enemyTeam", ["turret"]).color = "red"

    //ShipCreator.createShip("neutralTeam", ["dummy"]).color = "black"

    //ShipCreator.createShip("enemyTeam", ["dummy"]).color = "red"

    //ShipCreator.createShip("playerTeam", ["turret"]).color = "blue"
    //ShipCreator.createShip("enemyTeam", ["turret"]).color = "red"
    //ShipCreator.createShip("neutralTeam", ["robo"]).color = "red"
    //ShipCreator.createShip("enemyTeam", ["dummy"])
    //ShipCreator.createShip("enemyTeam", ["missile_v2", "mine"])
    //ShipCreator.createShip("enemyTeam", ["robo"])
    //ShipCreator.createShip("enemyTeam", ["raio", "dummy", "missile"])
    //ShipCreator.createShip("enemyTeam", ["movable"]).color = "red"
    //ShipCreator.createShip("enemyTeam", ["bot", "movable"])

    //ShipCreator.createShip("playerTeam", ["movable", "turret"]).color = "blue"
    //ShipCreator.createShip("enemyTeam", ["movable_v2", "turret_v2"]).color = "red"
    //ShipCreator.createShip("neutralTeam", ["movable", "turret"]).color = "black"

    //ShipCreator.createShip("enemyTeam", ["movable"]).color = "pink"

    setInterval(() => {
        //ShipCreator.createShip("enemyTeam", ["bot", "movable"])
        //ShipCreator.createShip("enemyTeam", ["movable"])
        //ShipCreator.createShip("enemyTeam", ["mine"])
        //ShipCreator.createShip("enemyTeam", ["missile"])
        //ShipCreator.createShip("enemyTeam", ["raio", "dummy"])

        //ShipCreator.createShip("playerTeam", ["turret"]).color = "blue"
        //ShipCreator.createShip("enemyTeam", ["turret"]).color = "red"
        //ShipCreator.createShip("neutralTeam", ["turret"]).color = "black"

        //ShipCreator.createShip("playerTeam", ["movable", "turret"]).color = "blue"
        //ShipCreator.createShip("enemyTeam", ["movable", "turret"]).color = "red"
        //ShipCreator.createShip("neutralTeam", ["movable", "turret"]).color = "black"

    }, 1000)

    KeyBoard.addTriggers()

}

//adicionar algo de evolua com o "tempo" tipo um facotry que posdus algo e qunado esse algo morre produz um versão melhorada!

// tauvel fazer uma lisda de prioridades tipo, eu quero: ships, missie, turret, bulet

// naves especialis tipo: um namo com energia infinita!

function gameLoop(){

    KeyBoard.runCommands()

    stats.updateStatus()

    AI.updateAI()
    Physics.updatePhysics()
    Rules.updateRules()

    HUD.updateHUD()

    ScreenRender.updateRender()

    window.requestAnimationFrame(gameLoop)

}