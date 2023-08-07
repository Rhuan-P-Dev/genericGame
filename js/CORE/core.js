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

/* FRAME */
import { FrameController } from "../frame/frameController.js"

var Frame = ""

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

    /* FRAME */

    Frame = new FrameController()

    setTimeout(browseInit,1)
    setTimeout(gameLoop,1)

})

function browseInit(){

    ShipCreator.createShip("playerTeam", false, true)
    ShipCreator.createShip("enemyTeam", ["dummy"]).color = "red"

    //ShipCreator.createShip("enemyTeam", ["missile_v2","turret"]).color = "red"

    //ShipCreator.createShip("enemyTeam").color = "red"

    //ShipCreator.createShip("enemyTeam", ["missile_v2","turret"]).color = "red"
    //ShipCreator.createShip("enemyTeam", ["missile_v2","turret"]).color = "red"
    //ShipCreator.createShip("enemyTeam", ["missile_v2","turret"]).color = "red"

    //ShipCreator.createShip("enemyTeam", ["dummy"])

    //ShipCreator.createShip("enemyTeam", ["dummy"]).color = "red"

    //ShipCreator.createShip("playerTeam", ["dummy"]).color = "green"

    //ShipCreator.createShip("neutralTeam", ["dummy"]).color = "black"

    //ShipCreator.createShip("enemyTeam", ["dummy"]).color = "red"

    //ShipCreator.createShip("playerTeam", ["turret"]).color = "blue"
    //ShipCreator.createShip("enemyTeam", ["turret"]).color = "red"
    //ShipCreator.createShip("neutralTeam", ["robo"]).color = "red"
    //ShipCreator.createShip("enemyTeam", ["dummy"])
    //ShipCreator.createShip("enemyTeam", ["robo"])
    //ShipCreator.createShip("enemyTeam", ["raio", "dummy", "missile"])
    //ShipCreator.createShip("enemyTeam", ["movable"]).color = "red"
    //ShipCreator.createShip("enemyTeam", ["bot", "movable"])

    //ShipCreator.createShip("playerTeam", ["movable", "turret"]).color = "blue"
    //ShipCreator.createShip("enemyTeam", ["movable_v2", "turret_v2"]).color = "red"
    //ShipCreator.createShip("neutralTeam", ["movable", "turret"]).color = "black"

    //ShipCreator.createShip("enemyTeam", ["movable"]).color = "pink"


    //ShipCreator.createShip("enemyTeam", ["movable", "turret"]).color = "red"
    //ShipCreator.createShip("enemyTeam", ["movable", "turret"]).color = "red"
    //ShipCreator.createShip("enemyTeam", ["movable", "turret"]).color = "red"

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

    }, 100)

    KeyBoard.addTriggers()

}

//
//// DEPOIS DE COMIITAR EU DEVO CORRIGIR OS BUGS []
//// E ESTRUTURAR MELHOR O PROJETO []
//


// adicionar um mecanismo que o objeto de atensao adicional para outro objeto

// adicionar algo de evolua com o "tempo" tipo um facotry que posdus algo e qunado esse algo morre produz um versão melhorada!

// fazer varios projeteis com "metade" da força. o nome poderiaser replicator???

// uma arma que aao inver de sobre escrever novos projeteis essa arma criar mais projeteis facros e junta com os antigos

// um tipo especial de "nave?" que tem varias facetas em qunato um estiver viva todas vivem? / renasão

// alem de modificados eu quero >effects< nos projetesi

// um tipo de objeto especial que NÃO morre

// algo que resusite!

// uma mina. factory...

// o modulo que faz os clones NÃO esta clonado os modificadores apenas as armas

/* > BUG <

as armas NÃO estão sendo deletadas

os effetios NÃO estão sendo deletados

os effects NÃO estão sendo clonados

*/

// fazer uma nave especial que caça outras naves e recebe recompensas
// buff para o nave caçada: + dano, etc
// debuff para naves NÃO caçadas: - dano, etc

// duplicator??? [?]
// ilusionista [?]

// um nave FODA porem... tem um caçador de recompesans [/]
// algo depois de um tempo vai para a SEGUNDA ETAPA [/]

// nave special: um nave que com opaser dos segundos fica mais forter! [/]
// nave: que reduz enormemente e pelozidade dos objetos aoredor. pique gojo [/]
// naves especialis tipo: um namo com energia infinita! [/]

function gameLoop(){

    Frame.update()

    KeyBoard.runCommands()

    stats.update()

    Physics.update()

    AI.update()

    Rules.update()

    HUD.update()

    ScreenRender.update()

    window.requestAnimationFrame(gameLoop)

}