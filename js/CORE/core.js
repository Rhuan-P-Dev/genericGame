/* AI */
import { AIController } from "../AI/AIController.js"

var AI = ""

/* SHIP */
import { ShipCreatorController } from "../ship/shipCreatorController.js"

var ShipCreator = ""

/* KEYBOARD */
import { KeyBoardController } from "../keyboard/keyBoardController.js"

var KeyBoard = ""

/* STATS */
import { StatsController } from "../stats/statsController.js"

var Stats = ""

/* RULES */
import { RulesController } from "../rules/rulesController.js"

var Rules = ""

/* PHYSICS */
import { PhysicsController } from "../physics/physicsController.js"

var Physics = ""

/* GRAPHICS */
import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { HUDController } from "../graphics/HUDController.js"
import { StatusbarController } from "../graphics/statusbarController.js"

var ScreenRender = ""
var HUD = ""
var Statusbar = ""

/* FRAME */
import { FrameController } from "../frame/frameController.js"

var Frame = ""

onInit(function(){

    /* AI */

    AI = new AIController()

    /* SHIP */
    ShipCreator = new ShipCreatorController()

    /* KEYBOARD */

    KeyBoard = new KeyBoardController()

    /* STATS */

    Stats = new StatsController()

    /* RULES */

    Rules = new RulesController()

    /* PHYSICS */

    Physics = new PhysicsController()

    /* GRAPHICS */

    ScreenRender = new ScreenRenderController()
    HUD = new HUDController()
    Statusbar = new StatusbarController()

    /* FRAME */

    Frame = new FrameController()

    setTimeout(browseInit,1)
    setTimeout(gameLoop,1)

    setTimeout(mediumGameLoop,1)

})

function browseInit(){

    ShipCreator.createShip("playerTeam", ["missileV1", "useActivates"], true).color = "green"

    //ShipCreator.createShip("playerTeam", ["missileV1","useActivates"]).color = "black"

    //ShipCreator.createShip("enemyTeam", ["dummy"]).color = "red"

    ShipCreator.createShip("enemyTeam", ["movable","useActivates"]).color = "purple"

    //ShipCreator.createShip("enemyTeam", ["useActivates"]).color = "red"

    //ShipCreator.createShip("enemyTeam").color = "red"

    //ShipCreator.createShip("enemyTeam", ["useActivates"]).color = "red"

    //ShipCreator.createShip("enemyTeam", ["dummy"])

    //ShipCreator.createShip("enemyTeam", ["dummy"]).color = "red"

    //ShipCreator.createShip("playerTeam", ["dummy"]).color = "green"

    //ShipCreator.createShip("neutralTeam", ["dummy"]).color = "black"

    //ShipCreator.createShip("enemyTeam", ["dummy"]).color = "red"

    //ShipCreator.createShip("playerTeam", ["useActivates"]).color = "blue"
    //ShipCreator.createShip("enemyTeam", ["useActivates"]).color = "red"
    //ShipCreator.createShip("neutralTeam", ["robo"]).color = "red"
    //ShipCreator.createShip("enemyTeam", ["dummy"])
    //ShipCreator.createShip("enemyTeam", ["robo"])
    //ShipCreator.createShip("enemyTeam", ["raio", "dummy", "missileV1"])
    //ShipCreator.createShip("enemyTeam", ["movable"]).color = "red"
    //ShipCreator.createShip("enemyTeam", ["bot", "movable"])

    //ShipCreator.createShip("playerTeam", ["movable", "useActivates"]).color = "blue"
    //ShipCreator.createShip("enemyTeam", ["movable_v2", "turret_v2"]).color = "red"
    //ShipCreator.createShip("neutralTeam", ["movable", "useActivates"]).color = "black"

    //ShipCreator.createShip("enemyTeam", ["movable"]).color = "pink"

    //ShipCreator.createShip("enemyTeam", ["movable", "useActivates"]).color = "red"
    //ShipCreator.createShip("enemyTeam", ["movable", "useActivates"]).color = "red"
    //ShipCreator.createShip("enemyTeam", ["movable", "useActivates"]).color = "red"

    setInterval(() => {

        ShipCreator.createShip("playerTeam", ["movable","useActivates"]).color = "lightgreen"

        ShipCreator.createShip("enemyTeam", ["movable","useActivates"]).color = "purple"

        //ShipCreator.createShip("enemyTeam", ["missileV1","useActivates"]).color = "purple"

        //ShipCreator.createShip("enemyTeam", ["movable","useActivates"]).color = "pink"

        //ShipCreator.createShip("enemyTeam", ["bot", "movable"])
        //ShipCreator.createShip("enemyTeam", ["movable"])
        //ShipCreator.createShip("enemyTeam", ["mine"])
        //ShipCreator.createShip("enemyTeam", ["missileV1"])
        //ShipCreator.createShip("enemyTeam", ["raio", "dummy"])

        //ShipCreator.createShip("playerTeam", ["useActivates"]).color = "blue"
        //ShipCreator.createShip("enemyTeam", ["useActivates"]).color = "red"
        //ShipCreator.createShip("neutralTeam", ["useActivates"]).color = "black"

        //ShipCreator.createShip("playerTeam", ["movable", "useActivates"]).color = "blue"
        //ShipCreator.createShip("enemyTeam", ["movable", "useActivates"]).color = "red"
        //ShipCreator.createShip("neutralTeam", ["movable", "useActivates"]).color = "black"

        //ShipCreator.createShip("enemyTeam", ["movable","useActivates"]).color = "purple"

    }, 10000)

    KeyBoard.addTriggers()

}


/* > NEXT <

add varias armas, com efeito, mutadores. para fazer 'testes' altomatizados! []

focar em polir e refatorar o que ja tem!

ADICIONAR UM TIPO DE MULTIPLICADOR GLOBAL []

o black hole esta imcompleto!

? um projetil tipo spike que gruda nas coisas - FISICAS!?

*/

/*

if(build){
    this.selfBuild() se a classe não tem o inherit deve usar isso!
}

*/

/* > opmimize <

optimizar o sistema de colisoes! []

ao inves de fixar todo frame os status dos objetos, você pode user observers! []

*/

/* > ADD <

ALGUEN DEVE GUARDAR QUAILS STATS DEVEM SER MULT E OUTRAS COISAS / DEVE TER SCHEDULER ETC / CERTOS STATUS NÃO DEVEM SOFRER TANTO! []

add this > // wrong!
object.x = object.owner.x + object.xOffset
object.y = object.owner.y + object.yOffset

*/

/* > RE <

claramente o jeito que os objetos se movimentão esta errado! []

returnArrayWithAlllObjectsOfTeams( // create a cache, think! same params of request use cache! []

adicionar um mecanismo que o objeto de atensao adicional para outro objeto []

*/

/* > BUG <

modulo que faz os clones NÃO esta clonado os modificadores apenas as armas

*/

//um tipo de objeto especial que NÃO morre []

//algo que resusite! []

//UMA ARMA QUE VONCERTE OS ENEMYGOS? [/]

//adicionar algo de evolua com o "tempo" tipo um facotry que posdus algo e qunado esse algo morre produz um versão melhorada! []

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

// uma nave special: player no spewna gera algo, toda vez que o player morre ele renaçe no algo []

// uma nave special: 'só existe uma ração' qunado morre tem % de chante de renacer, começa em: 0 e almenta a cada segundo []
// um efeito com % de ativar []

// "depois que eu morrer outros virão..." []
// um tipo especial de "nave?" que tem varias facetas em qunato um estiver viva todas vivem? / renasão []

// uma nave tipo 'gilgamesh', se a prioridade da nave enemiga for maior... se o HP estiver baixo... []
// uma nave tipo "gojo joven" []

// "peoes do rei" periodicamente converta algo []

// um nave que "sempre" volta?????? [?]

// parar o tempo? []

// uma nave especial qndo morre cria um clone de si mesmo com menos STATS. []

// um tipo de factory, que criar algo com pontos obetidos por tempo / kills []

// uma nave special que tem X cores, cada core pode ser derrupado caso a nave the X% de vida, cada core, pode ser: um stats, poderzin!

// quando algo morre divide em dois? []

// uma nave que se adaptar ao dano levado []

// uma nave que tira a multiplicador nas coisas? []

// uma nave com X poderes e quando ela morre vira X naves com 1 poder cada! []













// areana closer...


function gameLoop(){

    Frame.update()

    KeyBoard.runCommands()

    Stats.update()

    Physics.update()

    AI.update()

    Rules.update()

    Statusbar.update()

    ScreenRender.update()

    window.requestAnimationFrame(gameLoop)

}

const mediumLoopConst = 10
var mediumLoop = mediumLoopConst

function mediumGameLoop(){

    if(mediumLoop > 0){
        mediumLoop -= 1
    }else{

        HUD.update()

        mediumLoop = mediumLoopConst

    }

    window.requestAnimationFrame(mediumGameLoop)

}