import { AIUtilsController } from "../../AI/utils/AIUtils.js"
import { FrameController } from "../../frame/frameController.js"
import { CustomMathController } from "../../generalUtils/math.js"
import { ScreenRenderController } from "../../graphics/screenRenderController.js"
import { ShipCreatorController } from "../../ship/shipCreatorController.js"
import { ActivateController } from "../../shipUnits/forAllShipUnits/activateController.js"
import { SpecialController } from "../../shipUnits/special/specialController.js"
import { EffectsController } from "../effectsController.js"
import { GameStateController } from "../../gameState/gameStateController.js"

// For 'reinforcements' effect
import { MSP1 } from "../../shipUnits/factory/info/factory/MSP1.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { WeaponsController } from "../../shipUnits/weapons/weaponsController.js"
import { FocusedTopDownBehavior } from "../../AI/behavior/focusedTopDownBehavior.js"

var Frame = ""
var AIUtils = ""
var ScreenRender = ""
var Special = ""
var ShipCreator = ""
var CustomMath = ""
var Effects = ""
var Activate = ""
var GameState = ""
var Weapons = ""

onInit(function(){

    Frame = new FrameController()
    AIUtils = new AIUtilsController()
    ScreenRender = new ScreenRenderController()
    Special = new SpecialController()
    ShipCreator = new ShipCreatorController()
    CustomMath = new CustomMathController()
    Effects = new EffectsController()
    Activate = new ActivateController()
    GameState = new GameStateController()
    Weapons = new WeaponsController()

})

export class OtherEffectsController {

    effectsList = {

        "revenger": (params) => {

            let missile = Weapons.createMissile(params.object)

            missile.damage = params.otherObject.damage

            new InheritController().inherit(
                missile,
                [
                    FocusedTopDownBehavior,
                ]
            )

            Activate.basicAjustObject(params.object, missile)

            Activate.addObject(missile)

        },

        "convert": (params) => {

            GameState.changeTeam(
                params.otherObject,
                params.otherObject.team,
                params.object.team
            )

            params.otherObject.color = params.object.color

        },

    }

    effectsInfo = {

        "positive": {

            "converter": {

                "on": {

                    "config": {
                        "func": this.effectsList["convert"],
                    },
        
                    "params": {},

                },
    
            },

            "reflet damage": {

                "config": {
                    "func": this.effectsList["revenger"],
                },
    
                "params": {
                },
    
            },

        },

        "negative": {

        },

    }

    getAll(){
        return this.effectsInfo
    }

    get(effectName){
        return this.effectsInfo[effectName]
    }

}

var OtherEffects = new OtherEffectsController()