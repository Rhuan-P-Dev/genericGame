import { AIUtilsController } from "../../AI/utils/AIUtils.js"
import { FrameController } from "../../frame/frameController.js"
import { MathController } from "../../generalUtils/math.js"
import { ScreenRenderController } from "../../graphics/screenRenderController.js"
import { ShipCreatorController } from "../../ship/shipCreatorController.js"
import { ActivateController } from "../../shipUnits/forAllShipUnits/activateController.js"
import { SpecialController } from "../../shipUnits/special/specialController.js"
import { EffectsController } from "../effectsController.js"
import { GameStateController } from "../../gameState/gameStateController.js"

import { AnimationsController } from "../../graphics/animation/animationsController.js"


// For 'reinforcements' effect
import { MSP1 } from "../../shipUnits/factory/info/factory/MSP1.js"





var Frame = ""
var AIUtils = ""
var ScreenRender = ""
var Special = ""
var ShipCreator = ""
var Math = ""
var Effects = ""
var Activate = ""
var GameState = ""

onInit(function(){

    Frame = new FrameController()
    AIUtils = new AIUtilsController()
    ScreenRender = new ScreenRenderController()
    Special = new SpecialController()
    ShipCreator = new ShipCreatorController()
    Math = new MathController()
    Effects = new EffectsController()
    Activate = new ActivateController()
    GameState = new GameStateController()

})

export class GenericEffectsController {

    effectsList = {

        "sum max energy": (params) => {

            params.object.energy += params.object.maxEnergy * params.mult

        },

        "lv up": (params) => {

            Special.lvUp(
                params.object,
                undefined,
                {
                    "mult": params.mult
                }
            )

            new AnimationsController().run({
                "name":"heal",
                "type":"relative",
                "offset": {
                    "x": params.object.x + randomInteger(-0, 0),
                    "y": params.object.y + randomInteger(-0, 0),
                },
                "frameRandomOffsetX": 0,
                "frameRandomOffsetY": 0,
            })

        },

        "reinforcements": (params) => {

            let help = new params.objectClass() || params.custom.class

            let newObject = help.func(
                params.object,
                undefined,
                help.config || params.custom.config,
            )

            Activate.addObject(newObject)

        },

        "clone": (params) => {

            Special.weakClone(
                params.object,
                undefined,
                {
                    "mult": params.mult
                }
            )

        },

        "illusion": (params) => {

            Special.illusion(
                params.object,
            )

        },

        "slowdown": (params) => {

            let closestObjects = AIUtils.returnArrayWithAlllObjectsOfTeams(
                params.object,
                {
                    "maxDistance": params.range
                }
            )

            ScreenRender.addDrawRequest(
                {
                    "func": ScreenRender.drawCircle,
                    "params": {
                        "x": params.object.x,
                        "y": params.object.y,
                        "radius": params.range,
                    },
                }
            )

            for (let index = 0; index < closestObjects.length; index++) {

                let closestObject = closestObjects[index]

                let mult = Math.linearReverse(
// ADICINAR UM SCHEDULER PARA O CALCULO!
                    AIUtils.getDistanceOfObjects(params.object, closestObject),
                    params.range,
                )

                closestObject.currentXVel -= closestObject.currentXVel * (mult * params.mult)
                closestObject.currentYVel -= closestObject.currentYVel * (mult * params.mult)

            }

        },








        "thunder": (params) => {

            let closestObjects = AIUtils.returnArrayWithAlllObjectsOfTeams(
                params.object,
                {
                    "maxDistance": params.range,
                    "includeEnemyTeam": false,
                    "includeSameTeam": true,
                    "includeYourself": false,
                }
            )

            ScreenRender.addDrawRequest( // debug
                {
                    "func": ScreenRender.drawCircle,
                    "params": {
                        "x": params.object.x,
                        "y": params.object.y,
                        "radius": params.range,
                    },
                }
            )

            let closestObject = AIUtils.getObject(
                closestObjects,
                params.object,
                "closest"
            )

            params.object.life -= params.damage

            if(closestObject){

                ScreenRender.addDrawRequest(
                    {
                        "func": ScreenRender.drawLine,
                        "params": {
                            "positions": [
                                [
                                    params.object.x,
                                    params.object.y,
                                ],[
                                    params.closestObject.x,
                                    params.closestObject.y,
                                ]
                            ],
                            "color": params.color,
                            "lineWidth": params.lineWidth,
                        }
                    }

                )

                Effects.add(
                    params.effectName,
                    "effect",
                    {
                        "object": closestObject,
                        "range": params.range * params.mult,
                        "damage": params.damage * params.mult,
                        "mult": params.mult,

                        "color": params.color,
                        "lineWidth": params.lineWidth * params.mult,

                        "frameOut": params.frameOut * params.mult,
                        "effectName": params.effectName,
                    },{
                        "frameOut": params.frameOut * params.mult
                    }
                )

            }

        },




        "dd": (params) => {

            new AnimationsController().run({
                "name":"heal",
                "type":"relative",
                "offset": params.object
            })

        },

    }

    effectsInfo = {

        "positive": {

            "breathe": {

                "config": {
                    "func": this.effectsList["sum max energy"],
                    "frameOut": 60,
                    "repeat": -1,
                },
    
                "params": {
                    "mult": 0.01,
                },
    
            },
            "evolutron": {
    
                "config": {
                    "func": this.effectsList["lv up"],
                    "frameOut": 60,
                    "repeat": -1,
                },
    
                "params": {
                    "mult": 0.01,
                },
    
            },
            "second stage": {
    
                "config": {
                    "func": this.effectsList["lv up"],
                    "frameOut": 3600,
                    "repeat": 1,
                },
    
                "params": {
                    "mult": 2,
                },
    
            },
            "clone v0.1": {
    
                "config": {
                    "func": this.effectsList["clone"],
                    "frameOut": 300,
                    "repeat": -1,
                },
    
                "params": {
                    "mult": -0.9,
                },
    
            },
            "illusion v1": {
    
                "config": {
                    "func": this.effectsList["illusion"],
                    "frameOut": 30,
                    "repeat": 2,
                },
    
                "params": {},
    
            },
            "slowdown area": {
    
                "config": {
                    "func": this.effectsList["slowdown"],
                    "frameOut": 30,
                    "repeat": -1,
                    "overwrite": false,
                },
    
                "params": {
                    "range": 175,
                    "mult": 1,
                },
    
            },
            "untouchable": {
    
                "config": {
                    "func": this.effectsList["slowdown"],
                    "frameOut": 5,
                    "repeat": -1,
                    "overwrite": false,
                },
    
                "params": {
                    "range": 50,
                    "mult": 1,
                },
    
            },
            "deflet area": {
    
                "config": {
                    "func": this.effectsList["slowdown"],
                    "frameOut": 60,
                    "repeat": -1,
                },
    
                "params": {
                    "range": 75,
                    "mult": 3,
                },
    
            },
            "help": {
    
                "config": {
                    "func": this.effectsList["reinforcements"],
                    "frameOut": 60,
                    "repeat": 4,
                },
    
                "params": {
                    "objectClass": MSP1,
                    "custom": undefined,
                },
                
            },

            "d": {
    
                "config": {
                    "func": this.effectsList["dd"],
                    "frameOut": 30,
                    "repeat": -1,
                },
    
                "params": {
                },
                
            },

        },

        "negative": {

            "shock": {

                "config": {
                    "func": this.effectsList["thunder"],
                    "frameOut": 20,
                    "repeat": 1,
                },
    
                "params": {
                    "range": 300,
                    "damage": 1,
                    "mult": 0.5,

                    "color": "yellow",
                    "lineWidth": 4,
    
                    "effectName": "shock",
                    "frameOut": 20
                },
    
            },

            "zeus": {
    
                "config": {
                    "func": this.effectsList["thunder"],
                    "frameOut": 5,
                    "repeat": 1,
                },
    
                "params": {
                    "range": 50,
                    "damage": 10,
                    "mult": 1.1,

                    "color": "yellow",
                    "lineWidth": 1,
    
                    "effectName": "zeus",
                    "frameOut": 5
                },
    
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

var GenericEffects = new GenericEffectsController()