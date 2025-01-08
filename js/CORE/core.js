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
import { FrameController, setFrameOut } from "../frame/frameController.js"

var Frame = ""

/* GAMESTATE */
import { GameStateController } from "../gameState/gameStateController.js"
import { Prisp } from "../object/complex/special ship/prisp.js"
import { Cryprwtrazghu } from "../object/complex/special ship/cryprwtrazghu/cryprwtrazghu.js"
import { Cry } from "../object/complex/special ship/cryprwtrazghu/cry.js"
import { Traz } from "../object/complex/special ship/cryprwtrazghu/traz.js"
import { Ghu } from "../object/complex/special ship/cryprwtrazghu/ghu.js"
import { Cryprw } from "../object/complex/special ship/cryprwtrazghu/cryprw.js"
import { Fenix } from "../object/complex/special ship/fenix.js"
import { TheBlessed } from "../object/complex/special ship/theBlessed.js"
import { SelfSwarmMotherShip } from "../object/complex/special ship/selfSwarmMotherShip.js"
import { BountyHunter } from "../object/complex/special ship/bountyHunter.js"
import { SelfSwarmMelee } from "../shipUnits/factory/info/factory/selfSwarmMelee.js"
import { Trazghu } from "../object/complex/special ship/cryprwtrazghu/trazghu.js"

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

    let eu = ShipCreator.createShip(
        "playerTeam",
        ["movable","escortAlly","useActivates"],
        {
            "weapon": [
                //"black hole generator 1"
                "mini world launcher"
            ]
        },
        {
            "add": {
                "effect": [
                    //"devour",
                    //"attraction"
                ]
                //"onDamage": [
                //    "the blessed effect: special"
                //]
            },
            "apply": []
        },
        true,
        new TheBlessed(true)
    )
    //eu.lifeTime = 1

    for (let index = 0; index < 0; index++) {
        ShipCreator.createShip("playerTeam", ["escortAlly","flee","useActivates","movable","areaSupport","directionalDefense","dodge"], false, new BountyHunter(true)).color = "blue"
        //ShipCreator.createShip("playerTeam", ["movable","useActivates"], false).color = "blue"
    }

    //eu.x = 50
    //eu.y = 50
    //eu.currentYVel = 2

    //let ele = ShipCreator.createShip("enemyTeam", ["movable", "useActivates"], false)
    //ele.x = 815
    //ele.y = 575

    //let ele = ShipCreator.createShip("enemyTeam", ["accelerate"], false)
    //ele.x = 815
    //ele.y = 575

    //ele = ShipCreator.createShip("enemyTeam", ["movable"], false)
    //ele.x = 815
    //ele.y = 575

    //ele = ShipCreator.createShip("enemyTeam", ["missileV1"], false)
    //ele.x = 815
    //ele.y = 575

    //ShipCreator.createShip("playerTeam", ["movable"], false, new BountyHunter(true))
    //let ele = ShipCreator.createShip("playerTeam", [], false, new TheBlessed(true))

    //new TheBlessed(true)
    //eu.priority = -1
    eu.color = "green"
    eu.maxEnergy *= 10
    eu.energyRegen *= 1011
    //eu.lifeRegen = 601

    //eu.lifeTime = 12

    //ShipCreator.createShip("enemyTeam", [], false, new Fenix(true)).color = "red"

    for (let index = 0; index < 1; index++) {

        //let t = ShipCreator.createShip("enemyTeam", ["movable","useActivates","flee"], false)
        //let t = ShipCreator.createShip("enemyTeam", ["movable","flee","dodge","useActivates"], false)
        let t = ShipCreator.createShip("enemyTeam", [
            //"movable","useActivates"
        ],
        {
            //"weapon": ["random","random"],
            //"factory": ["random"],
        },
        {
            "add": {},
            "apply": []
        },
        false,
        new Trazghu(true)
        )
        t.color = "red"
        //t.lifeRegen = 60
        //t.maxLife = -1
        //t.searchPriority.favoriteTargets = ["123"],
        //t.searchPriority.favoriteTargetsObsession = {
        //    "123": 0.5
        //}

        continue

        let a = ShipCreator.createShip("enemyTeam", [], false, new TheBlessed(true))
        let b = ShipCreator.createShip("enemyTeam", [], false, new Cryprwtrazghu(true))
        let c = ShipCreator.createShip("enemyTeam", [], false, new Prisp(true))
        let d = ShipCreator.createShip("enemyTeam", [], false, new Fenix(true))
        let e = ShipCreator.createShip("enemyTeam", [], false, new BountyHunter(true))
        let f = ShipCreator.createShip("enemyTeam", [], false, new SelfSwarmMotherShip(true))

        a.x = 0
        a.y = 0

        b.x = 60
        b.y = 0

        c.x = 120
        c.y = 0

        d.x = 180
        d.y = 0

        e.x = 240
        e.y = 0

        f.x = 300
        f.y = 0

        //ShipCreator.createShip("playerTeam", [], false, new Cryprwtrazghu(true))

        //ShipCreator.createShip("enemyTeam", ["movable","useActivates"], false)
        //ShipCreator.createShip("enemyTeam", ["movable","useActivates"], false, new TheBlessed(true))
        //ShipCreator.createShip("enemyTeam", ["movable","useActivates"], false, new Cryprwtrazghu(true))
        //ShipCreator.createShip("enemyTeam", ["movable","useActivates"], false, new Prisp(true))
        //ShipCreator.createShip("enemyTeam", ["movable","useActivates"], false, new Fenix(true))

    }

    for (let index = 0; index < 0; index++) {
        //let enemy = ShipCreator.createShip("enemyTeam", ["movable", "useActivates"], false, new SelfSwarmMotherShip(true))
        //enemy.color = "red"
        let aly = ShipCreator.createShip("playerTeam", ["movable", "useActivates"], false, new TheBlessed(true))
        setFrameOut(() => {
            ScreenRender.setFocusObject(aly)
        },1)
        aly.color = "blue"
    }


    //ShipCreator.createShip("enemyTeam", ["movable", "useActivates"]).color = "red"
    //ShipCreator.createShip("enemyTeam", ["movable", "useActivates"]).color = "red"
    //ShipCreator.createShip("enemyTeam", ["movable", "useActivates"]).color = "red"

    //ShipCreator.createShip("enemyTeam", ["movable","useActivates"]).color = "red"
    //ShipCreator.createShip("enemyTeam", ["accelerate"]).color = "purple"
    //ShipCreator.createShip("enemyTeam", ["movable","useActivates"]).color = "purple"

    setInterval(() => {

        return

        ShipCreator.createShip("playerTeam", ["escortAlly","flee","useActivates","movable","areaSupport","directionalDefense","dodge"]).color = "blue"
        ShipCreator.createShip("enemyTeam", ["escortAlly","flee","useActivates","movable","areaSupport","directionalDefense","dodge"]).color = "red"

    }, 10000)

    setInterval(() => {

        return

        // arena closer
        console.log("close...")

        for (let index = 0; index < 100; index++) {

            ShipCreator.createShip("neutralTeam", ["escortAlly","flee","useActivates","movable","areaSupport","directionalDefense","dodge"]).lifeTime = 10*60

        }

    }, 60000)

    KeyBoard.addTriggers()

}

// MULTYPLAYER?

// O 'BOSS FINAL!'

// O TEST QUANTUM BOMB KILL ALIIYES???

// defineTypeOfLoarderName................................................. Loarder

// OTIMIZAR A FUMAÇA

// make AI more letal, sniper, know?
// make the AI desviar

// nave s: nulificador
// raio NULIFICADOR
// retira stats maximos e regens
// bola nulificadore que crese!
// um tipo de nulificação abusoluta

// fazer um "movable" que temta desviar do objeto

// talvez refazer todo para emcaixar um sistema de zoom decente? que multiplica o X e Y

//se a espanão de domini o teleportase parta outra parte do mapa?

/*
O DEUS DA ESCURIDÃO ABISAL! uma nave vai perdendo o HP a escuridão vai tomando! taus etapsas
NAVE TRISTE!!!
*/

// UMA NAVE ESPECIAL DEVERIAR CONSEGUIR CLONAR SE?

// um missile com escudo.

// uma arma que degenera stats

/* > NEXT <

na rotasão precissa ir deireto para a porcentage que deseja caso não aja vá em 100%

re-estruturar os objetos import e etc []

quando for adicioanr um objeto no jogo, loopers como o 'ruler' dever pergar o objeto e analizar para colocar no local correto

o 'feito' do buraco necro é solo/não da para apagar! de crecer/diminuir

// um tipo de factory, que criar algo com pontos obetidos por tempo / kills []

ADICIONAR UM TIPO DE MULTIPLICADOR GLOBAL []

o black hole esta imcompleto!

special - travel - cria um objeto no ponto de partida e no final, qunado um objeto(aliado) tocam em qualquer um teleprota para o outro!

uma arma em formato de cone que congela/slowdon o alvo

criar uma nova categoria chamada suporte?

// rachadura - dar dano? tira maximos? e deixa vuneravel

um missil anti-naves rapidas

item que chama outras naves como apoio

uma arma que faz um overclock forçado
uma arma que control suya nave enemiga

empreratriz louca - covnert enemys into madness allyes 
ela tem eenrgia cursed
the main attack is a lance - the lançe does agony damage - the lance is durable(has HP)
she can lance a homing lance.
she can lance a homing curse to convert enemys and make the mad - the curse don't have a grapic it has a animation of a curse
she has a special, it can deal the +50% damage has lance, multiples times


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

add this > // wrong!
object.x = object.owner.x + object.xOffset
object.y = object.owner.y + object.yOffset

*/

/* > RE <
returnArrayWithAlllObjectsOfTeams( // create a cache, think! same params of request use cache! []

uma nave com dodge não consegue prever pouco dano por frame! caso uma mae "boba" ataque não vai se devender coretametne.

*/

/* > BUG <

// exesso de uso de memoria ram
object = null?

modulo que faz os clones NÃO esta clonado os modificadores apenas as armas

*/

// um nave FODA porem... tem um caçador de recompesans []

// uma nave special: 'só existe uma ração' qunado morre tem % de chante de renacer, começa em: 0 e almenta a cada segundo []
// um efeito com % de ativar []

// uma nave tipo 'gilgamesh', se a prioridade da nave enemiga for maior... se o HP estiver baixo... []

// parar o tempo? []

// your nemesys []

// uma nave que se adaptar ao dano levado [x] ? []

// uma nave que tira a multiplicador nas coisas? []

// nave: capaz de realizar milagres periodicamente [] duplica tudo!(aliados)

// "peoes do rei" periodicamente converta algo []
// nave: o deus das factorys

//uma nave uqe fala "wake up", se ele morre ela respauwna, caso morra denovo antes do "wake up" ela morre

//uma nave que rouba os ativadores(ou até os epcial?) e tabem um pouco dos statos

//uma arma tipi parasite: REBELION! quanto mais forte for sua nave mais danor ela toma!

//um activate de cura que usa MUINTA energia para quando a vids cair por um serto valor recupera vida

// um necro mancer que revive naves/zombies a cada !!!onKill!!!

            /*

                the X_ACTIVATE call drones to help every 2m
                the X_ACTIVATE was the 100% to call drones
                the X_ACTIVATE was the 75% to call drones v2
                the X_ACTIVATE was the 50% to call big drones
                the X_ACTIVATE was the 25% to call a ship
                the X_ACTIVATE was the 10% to call police

                config = {
                    "objectClass": Drone,
                    "AI": ["movable","useActivates"],
                    "activates": {
                        "weapon": ["piston 1"],
                    },
                    "behavior": new FocusedNearBehavior().searchPriority,
                    "statsMult": 0,
                }

                  setFrameOut(
                () => {

                    if(
                        !GameState.getObject(updateThis.ID)
                    ){return}

                    /*

                    "configs": [
                        new MovableSaferPerimeter1().config,
                        new MovableSaferPerimeter1().config,
                        new SaferPerimeter1().config,
                    ],

                    "repeat": 1,
                    "dispersion": 1,
                    "velMult": 0,


                    GenericEffects.effectsList["create objects"]({
                        "configs": [
                            {
                                "objectClass": Drone,
                                "AI": ["movable","useActivates"],
                                "activates": {
                                    "weapon": ["piston 1"],
                                },
                                "behavior": new FocusedNearBehavior().searchPriority,
                                "statsMult": 0,
                            }
                        ],
                        "repeat": 1,
                        "dispersion": 1,
                        "velMult": 0,
                    })

                },
                2*10*60,
                -1
            )


            */


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