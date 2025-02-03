/* AI */
import { AIController } from "../../js/AI/AIController.js"

var AI = ""

/* SHIP */
import { ShipCreatorController } from "../../js/ship/shipCreatorController.js"

var ShipCreator = ""

/* KEYBOARD */
import { KeyBoardController } from "../../js/keyboard/keyBoardController.js"

var KeyBoard = ""

/* STATS */
import { StatsController } from "../../js/stats/statsController.js"

var Stats = ""

/* RULES */
import { RulesController } from "../../js/rules/rulesController.js"

var Rules = ""

/* PHYSICS */
import { PhysicsController } from "../../js/physics/physicsController.js"

var Physics = ""

/* GRAPHICS */
import { ScreenRenderController } from "../../js/graphics/screenRenderController.js"
import { StatusbarController } from "../../js/graphics/statusbarController.js"

var ScreenRender = ""
var Statusbar = ""

/* FRAME */
import { FrameController } from "../../js/frame/frameController.js"

var Frame = ""

/* GAMESTATE */
import { GameStateController } from "../../js/gameState/gameStateController.js"

var GameState = ""

/* WAVE */
import { WaveController } from "../wave/waveController.js"
import { WaveShopController } from "../shop/waveShopController.js"
import { MainShopMenuController } from "../shop/permanentShop/mainShopMenuController.js"
import { PermanentShopController } from "../shop/permanentShop/permanentShopController.js"
import { BuyShipMenuController } from "../shop/permanentShop/buyShipMenuController.js"
import { BuyForObjectController } from "../shop/permanentShop/buyForObjectController.js"
import { AISliderMenuController } from "../shop/permanentShop/AISliderMenuController.js"
import { BuyWeaponsModsController } from "../shop/permanentShop/buyWeaponsModsController.js"
import { FPSController } from "../../js/misc/FPSController.js"

var Wave
var WaveShop
var MainShopMenu
var PermanentShop
var BuyShipMenu
var BuyForObject
var AISliderMenu
var BuyWeaponsMods
var FPSC

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
    Statusbar = new StatusbarController()

    /* FRAME */

    Frame = new FrameController()

    /* GAMESTATE */

    GameState = new GameStateController()

    /* FPS */

    FPSC = new FPSController()

    /* WAVE */

    Wave = new WaveController()
    WaveShop = new WaveShopController()
    MainShopMenu = new MainShopMenuController()
    PermanentShop = new PermanentShopController()
    BuyShipMenu = new BuyShipMenuController()
    BuyForObject = new BuyForObjectController()
    AISliderMenu = new AISliderMenuController()
    BuyWeaponsMods = new BuyWeaponsModsController()

    setTimeout(browseInit,1)
    setTimeout(gameLoop,1)

    setTimeout(mediumGameLoop,1)
    setTimeout(longGameLoop,1)

})

function resizeCanvas(canvas) {
    // Get the screen width
    const screenWidth = window.innerWidth;
    
    // Calculate the ratio
    const ratio = screenWidth / 1600;
    
    // Apply the ratio to the canvas dimensions
    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height * ratio;
    
    // If the canvas has a context, adjust the scale
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.scale(ratio, ratio);
        }
    }
}


function browseInit(){

    resizeCanvas(document.getElementById("mainCanvas"))

    KeyBoard.addTriggers()
    WaveShop.init()
    MainShopMenu.init()
    BuyShipMenu.init()
    BuyForObject.init()
    AISliderMenu.init()
    PermanentShop.init()
    BuyWeaponsMods.init()

}

// CLONE PARA CASETE GOJO SPECIAL - DEJKGFH54870YFUJSDRGHFERYREHGUY???
// o feito de devorar da "bug"???
// MAX_UNIT?
// inheirit MAXSTACK!
// radius damage

/*

// nave: "final clock" []

// nave: "rei dos fracos"

imagina um 'asensaõ'? tipo pode exportar a sua unidade special! e pode comprar!

interações speiclais? firsk ~ sans, etc?

// O 'BOSS FINAL!'

*/

function gameLoop(){

    if(
        !WaveShop.isOpen()
        &&
        !PermanentShop.isOpen()
    ){

        FPSC.update()

        Frame.update()

        KeyBoard.runCommands()
    
        AI.update()
    
        Stats.update()
    
        Physics.update()
    
        Rules.update()
    
        Statusbar.update()
    
        ScreenRender.update()

    }

    window.requestAnimationFrame(gameLoop)

}

const mediumLoopConst = 10
var mediumLoop = mediumLoopConst

function mediumGameLoop(){

    return

    if(mediumLoop > 0){
        mediumLoop -= 1
    }else{

        mediumLoop = mediumLoopConst

    }

    window.requestAnimationFrame(mediumGameLoop)

}

const longLoopConst = 2*60
var longLoop = longLoopConst

function longGameLoop(){

    if(longLoop > 0){
        longLoop -= 1
    }else{

        if(
            !WaveShop.isOpen()
            &&
            !PermanentShop.isOpen()
        ){
            Wave.checkEndOfWave()
            Wave.checkPlayerTeam()
        }

        longLoop = longLoopConst

    }

    window.requestAnimationFrame(longGameLoop)

}