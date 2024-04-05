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

/* GAMESTATE */
import { GameStateController } from "../gameState/gameStateController.js"

var GameState = ""

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

    /* GAMESTATE */

    GameState = new GameStateController()

    setTimeout(browseInit,1)
    setTimeout(gameLoop,1)

    setTimeout(mediumGameLoop,1)

})

function browseInit(){

    ShipCreator.createShip("playerTeam", ["movable", "useActivates"], true).color = "green"

    //ShipCreator.createShip("enemyTeam", ["movable","useActivates"]).color = "red"
    //ShipCreator.createShip("enemyTeam", ["accelerate"]).color = "purple"
    ShipCreator.createShip("enemyTeam", ["dummy"]).color = "purple"

    setInterval(() => {

        ShipCreator.createShip("playerTeam", ["movable", "useActivates"]).color = "blue"
        ShipCreator.createShip("enemyTeam", ["movable", "useActivates"]).color = "red"

    }, 5000)

    setInterval(() => {

        // arena closer
        console.log("close...")

        for (let index = 0; index < 100; index++) {

            ShipCreator.createShip("neutralTeam", ["missileV1","useActivates"]).lifeTime = 10*60

        }

    }, 50000)

    KeyBoard.addTriggers()

}

/* > NEXT <

na rotasão precissa ir deireto para a porcentage que deseja caso não aja vá em 100%

re-estruturar os objetos import e etc []

quando for adicioanr um objeto no jogo, loopers como o 'ruler' dever pergar o objeto e analizar para colocar no local correto

focar em polir e refatorar o que ja tem!

qualquer [.life -= X] esta errado!

o 'feito' do buraco necro é solo/não da para apagar! de crecer/diminuir

// um tipo de factory, que criar algo com pontos obetidos por tempo / kills []

ADICIONAR UM TIPO DE MULTIPLICADOR GLOBAL []

o black hole esta imcompleto!

special - travel - cria um objeto no ponto de partida e no final, qunado um objeto(aliado) tocam em qualquer um teleprota para o outro!

emp - sistema diferente!

uma arma em formato de cone que congela/slowdon o alvo

- copiar a chefia -

escudo frontal/ de farias diresoes! [agora não dá! :( as balas "teleportão"]

- copiar a chefia -

criar uma nova categoria chamada suporte?














um missil anti-naves rapidas

item que chama outras naves como apoio

uma arma que faz um overclock forçado
uma arma que control suya nave enemiga


*/

/*

if(build){
    this.selfBuild() se a classe não tem o inherit deve usar isso!
}

*/

/* > opmimize <

optimizar o sistema de colisoes! []

opmizar o sistema de renderisasção
Exemplo: https://youtu.be/VKmPGmFY7H4?si=iUtJyK-DVVfxPHlO&t=2562


ao inves de fixar todo frame os status dos objetos, você pode user observers! [] empilha, empilha, empilha...

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

bug: missions atirados rapida mente com puco dano automatico
bug: casi vc mude de time suas armar automatica não mudão!

aparentemente the um bug na multiplicasão da velocidade

modulo que faz os clones NÃO esta clonado os modificadores apenas as armas

*/
//um tipo de objeto especial que NÃO morre []

//algo que resusite! []

// fazer uma nave especial que caça outras naves e recebe recompensas
// buff para o nave caçada: + dano, etc
// debuff para naves NÃO caçadas: - dano, etc

// duplicator??? [?]
// ilusionista [?]

// um nave FODA porem... tem um caçador de recompesans []
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

// um nave que "sempre" volta?????? [?] e depois que morre um ultima vez, essa nave nao pode ir para fora? / uma versão alternativa

// parar o tempo? []

// uma nave special que tem X cores, cada core pode ser derrupado caso a nave the X% de vida, cada core, pode ser: um stats, poderzin!

// uma nave que se adaptar ao dano levado []
// GENERAL DIVINO! []

// uma nave que tira a multiplicador nas coisas? []

// uma nave com X poderes e quando ela morre vira X naves com 1 poder cada! []

// uma nave especial qndo morre cria um clone de si mesmo com menos STATS. []
// quando algo morre divide em dois? []

// nave: capaz de realizar milagres periodicamente [] duplica tudo!(aliados)
// nave: "final clock" []

// nave: "rei dos fracos"
// "peoes do rei" periodicamente converta algo []
// nave: o deus das factorys

// nave?: "não sinto o peso dos meus atos"

// arena closer...

//algo que distribui o dano entre aliados

//uma nave uqe fala "wake up", se ele morre ela respauwna, caso morra denovo antes do "wake up" ela morre


var previousTime = performance.now()


function calculateFPS() {

    let currentTime = performance.now()
    let elapsedTime = (currentTime - previousTime) / 1000
    previousTime = currentTime
    let fps = parseInt(1 / elapsedTime)

    if(fps < 5){
        return false
    }else{
        return true
    }

}

function gameLoop(){

    Frame.update()

    KeyBoard.runCommands()

    AI.update()

    Stats.update()

    Physics.update()

    Rules.update()

    Statusbar.update()

    ScreenRender.update()

    if(!calculateFPS()){
        console.warn("less than 5 FPS!")
        GameState.restart()
    }

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