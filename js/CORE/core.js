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


// EMPACOTAR!
// ONDAS DE INIMIGOS INFINITAS, CADA VEZ MAIS FORTE!

// O SYSTEMAS DE ONDAS SIRA FIXO? OU IGUAL O RIMWORLD?
// MINIMO: arma, defeça, special, factory
// COMFORME AS ONDAS VÃO AS NAVES INIMIGAR FICAN MAIS INTELIGENCES!
// ALEATORIMENTE AS NAVES PEGAR AUSILIADOERWES: dark energy, swarm
// efeitos!

// VC GANHA DINHEIRO - E % VAI SER CONVERTUIDO PARA DINHEIRO PARA BUFF PERM!
// DINHEIRO você combra: buffs, naves, ativadores, INTELIGENCIA, efeitos
// BUY! AS AUSILIADOERWES: dark energy, swarm


// make AI more letal, sniper, know?
// make the AI desviar

// LLM ?!!
// BIG SUPPORT BASE?

// dar uma leve polida








// seifador ABSOLÇUTO!

// nave s: nulificador

// um tipo de nulificação abusoluta

// fazer um "movable" que temta desviar do objeto

// overclock - kill

// talvez refazer todo para emcaixar um sistema de zoom decente? que multiplica o X e Y

// os auto wepoans não estam sendo apgados quanso se morre para o special

//se a espanão de domini o teleportase parta outra parte do mapa?

/*

os tiros da fenix serem embuidos de fogo!

O DEUS DA ESCURIDÃO ABISAL! uma nave vai perdendo o HP a escuridão vai tomando! taus etapsas
NAVE TRISTE!!!

*/


// atualiuzar os efeitos que redireconam dano

// UMA NAVE ESPECIAL DEVERIAR CONSEGUIR CLONAR SE?

// um missile com escudo.

// uma arma que degenera stats

/* > NEXT <

na rotasão precissa ir deireto para a porcentage que deseja caso não aja vá em 100%

re-estruturar os objetos import e etc []

quando for adicioanr um objeto no jogo, loopers como o 'ruler' dever pergar o objeto e analizar para colocar no local correto

qualquer [.life -= X] esta errado!

o 'feito' do buraco necro é solo/não da para apagar! de crecer/diminuir

// um tipo de factory, que criar algo com pontos obetidos por tempo / kills []

ADICIONAR UM TIPO DE MULTIPLICADOR GLOBAL []

o black hole esta imcompleto!

special - travel - cria um objeto no ponto de partida e no final, qunado um objeto(aliado) tocam em qualquer um teleprota para o outro!

uma arma em formato de cone que congela/slowdon o alvo

criar uma nova categoria chamada suporte?














um missil anti-naves rapidas

item que chama outras naves como apoio

uma arma que faz um overclock forçado
uma arma que control suya nave enemiga


*/

//um totem que sumona algo imortal? destrua o toteM!
/*

if(build){
    this.selfBuild() se a classe não tem o inherit deve usar isso!
}

*/

/* > opmimize <

optimizar o sistema de colisoes! []

*/

/* > ADD <

ALGUEN DEVE GUARDAR QUAILS STATS DEVEM SER MULT E OUTRAS COISAS / DEVE TER SCHEDULER ETC / CERTOS STATUS NÃO DEVEM SOFRER TANTO! []

add this > // wrong!
object.x = object.owner.x + object.xOffset
object.y = object.owner.y + object.yOffset

*/

/* > RE <
returnArrayWithAlllObjectsOfTeams( // create a cache, think! same params of request use cache! []

o jeito que o speial do a bensoado funcinar esta earrado

uma nave com dodge não consegue prever pouco dano por frame! caso uma mae "boba" ataque não vai se devender coretametne.

*/

/* > BUG <

as illusõesa NAõ iluden!

// exesso de uso de memoria ram
object = null?

bug: casi vc mude de time suas armar automatica não mudão!

o "boom" esta em vc qunado clona!

modulo que faz os clones NÃO esta clonado os modificadores apenas as armas

*/

// nave special: um nave que com opaser dos segundos fica mais forter! [/]
// naves especialis tipo: um namo com energia infinita! []

//um tipo de objeto especial que NÃO morre []

// um nave FODA porem... tem um caçador de recompesans []

// uma nave special: player no spewna gera algo, toda vez que o player morre ele renaçe no algo []

// uma nave special: 'só existe uma ração' qunado morre tem % de chante de renacer, começa em: 0 e almenta a cada segundo []
// um efeito com % de ativar []

// "depois que eu morrer outros virão..." []
// um tipo especial de "nave?" que tem varias facetas em qunato um estiver viva todas vivem? / renasão []

// uma nave tipo 'gilgamesh', se a prioridade da nave enemiga for maior... se o HP estiver baixo... []
// uma nave tipo "gojo joven" []

// um nave que "sempre" volta?????? [?] e depois que morre um ultima vez, essa nave nao pode ir para fora? / uma versão alternativa

// parar o tempo? []

// uma nave que se adaptar ao dano levado []
// GENERAL DIVINO! []

// uma nave que tira a multiplicador nas coisas? []

// uma nave especial qndo morre cria um clone de si mesmo com menos STATS. []
// quando algo morre divide em dois? []

// nave: capaz de realizar milagres periodicamente [] duplica tudo!(aliados)
// nave: "final clock" []

// nave: "rei dos fracos"
// "peoes do rei" periodicamente converta algo []
// nave: o deus das factorys

// nave?: "não sinto o peso dos meus atos"

// arena closer...

//uma nave uqe fala "wake up", se ele morre ela respauwna, caso morra denovo antes do "wake up" ela morre

//uma nave que rouba os ativadores(ou até os epcial?) e tabem um pouco dos statos

//uma arma tipi parasite: REBELION! quanto mais forte for sua nave mais danor ela toma!

//um activate de cura que usa MUINTA energia para quando a vids cair por um serto valor recupera vida

//uma nave que tem um "poll" de poder se esse poll checkar o maximo ela transende, essse poll consume para o ataque e para a defesa

// chara like kill XP!

// uma nave que é um "destribuidor"

// sans? gast blast 'drone'

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