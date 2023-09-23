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

    ShipCreator.createShip("playerTeam", ["missileV1", "useActivates"], true)

    //ShipCreator.createShip("playerTeam", ["missileV1","useActivates"]).color = "black"

    //ShipCreator.createShip("enemyTeam", ["dummy"]).color = "red"

    ShipCreator.createShip("enemyTeam", ["rotableTurret","useActivates"]).color = "purple"

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

    }, 10000)

    KeyBoard.addTriggers()

}




// CHEGA! DE PROGRAMAÇÃO!!!! HOARA DA MATEMATICA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! []

// no event, caso voce vá para sima e depois para a direita o "efetio" de ir para sime é anulado! [/]









//
//// E ESTRUTURAR MELHOR O PROJETO [?]
//

/* > ADD <

um tipo de objeto especial que NÃO morre []

algo que resusite! []

uma arma mina / factory... []

uma arma que aao inver de sobre escrever novos projeteis essa arma criar mais projeteis facros e junta com os antigos []

fazer varios projeteis com "metade" da força. o nome poderiaser replicator??? []

adicionar um novo modificador que randomiza atributos []

ALGUEN DEVE GUARDAR QUAILS STATS DEVEM SER MULT E OUTRAS COISAS []

UMA ARMA QUE VONCERTE OS ENEMYGOS? [/]

adicionar algo de evolua com o "tempo" tipo um facotry que posdus algo e qunado esse algo morre produz um versão melhorada! []

*/

/* > RE <


adicionar um mecanismo que o objeto de atensao adicional para outro objeto []

ADICIONAR UM TIPO DE MULTIPLICADOR GLOBAL []



ILLSUIONS DEVEM SER VISTAS, NAO AFETADAS, TYPO O "GOJO" []
TALVEZ ADICINAR "lifeTime" para illsuions? []

*/

/* > BUG <

as armas NÃo estão sendo clonas corretamente, caso o clone faça um clone , o clone do clone fica bugado

modulo que faz os clones NÃO esta clonado os modificadores apenas as armas

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