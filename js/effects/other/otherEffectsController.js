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

        "energy shield": (params) => {

            if(
                params.object.energy < 0
                ||
                params.calcDamage < 0
            ){return}

            let reducedDamage = params.calcDamage * params.config.getPercentage(params)

            params.object.energy -= reducedDamage

            if(params.object.energy < 0){return}

            params.calcDamage -= reducedDamage

        },

        "resurrection": (params) => {

            params.object.life = params.object.maxLife * params.config.getPercentage(params)

        },

        "revenger": (params) => {

            let damage = params.calcDamage * params.config.getPercentage(params)

            if(damage > 0){
                params.otherObjectMaster.life -= damage
            }

        },

        "convert": (params) => {

            GameState.changeTeam(
                params.otherObject,
                params.otherObject.team,
                params.object.team
            )

            params.otherObject.color = params.object.color

        },

        "damage multiplier": (params) => {

            params.calcDamage *= params.config.getPercentage(params)
            params.damage *= params.config.getPercentage(params)

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
            "energy shield of faith": {

                "on": {

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["energy shield"],
                        "suffixFunc": [],

                        "stage": "first",
                        "priority": 0,

                        "getPercentage": (params) => {

                            return params.object.energy / params.object.maxEnergy

                        }

                    },
        
                    "params": {},

                }

            },

            "energy barrier": {

                "on": {

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["energy shield"],
                        "suffixFunc": [],

                        "stage": "first",
                        "priority": 0,

                        "getPercentage": (params) => {

                            return 0.25

                        }

                    },
        
                    "params": {},

                }

            },

            "resurrection": {

                "on": {

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["resurrection"],
                        "suffixFunc": ["stopStages","deleteInstruction"],

                        "stopStages": {
                            "stages": ["last"],
                        },

                        "stage": "last",
                        "priority": 0,

                        "getPercentage": (params) => {

                            return 1

                        }

                    },
        
                    "params": {},

                }

            },

            "counterback":  {

                "on": {

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["revenger"],
                        "suffixFunc": [],

                        "stage": "middle",
                        "priority": 0,

                        "getPercentage": (params) => {

                            return 0.25

                        }

                    },
        
                    "params": {},

                }

            },

           



        },

        "negative": {

            "fragile": {

                "on": {

                    "config": {
                        "prefixFunc": ["countDown"],
                        "func": this.effectsList["damage multiplier"],
                        "suffixFunc": [],

                        "stage": "first",
                        "priority": 0,

                        "countDown": {
                            "countDownFunction": ["deleteInstruction"],
                            "count": 3
                        },

                        "getPercentage": (params) => {

                            return params.mult

                        }

                    },
        
                    "params": {

                        "mult": 1.5

                    },

                }

            },

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