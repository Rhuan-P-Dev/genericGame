import { AIUtilsController } from "../../AI/utils/AIUtils.js"
import { FrameController } from "../../frame/frameController.js"
import { CustomMathController } from "../../generalUtils/math.js"
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
var CustomMath = ""
var Effects = ""
var Activate = ""
var GameState = ""

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

            return

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

                let mult = CustomMath.linearReverse(
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

            params.object.life -= params.thunderDamage

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
                                    closestObject.x,
                                    closestObject.y,
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
                        "thunderDamage": params.thunderDamage * params.mult,
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

            ScreenRender.addDrawRequest(
                {
                    "func": ScreenRender.writeText,
                    "params": {
                        "text":"ASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                        "x": params.object.x,
                        "y": params.object.y,
                        "fontSize": 25,
                        "color": "white"
                    },
                }
            )

        },

    }

    effectsInfo = {

        "positive": {

            "breathe": {

                "effect": {

                    "config": {
                        "func": this.effectsList["sum max energy"],
                        "frameOut": 60,
                        "repeat": -1,
                    },
        
                    "params": {
                        "mult": 0.01,
                    },

                },

                "on": {

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["sum max energy"],
                        "suffixFunc": ["timeout"],

                        "timeout":{
                            "frameOut": 10,
                        },

                        "stage": "first",
                        "priority": 0,
                    },
        
                    "params": {
                        "mult": 0.01,
                    },

                },
    
            },
            "evolutron": {

                "effect": {

                    "config": {
                        "func": this.effectsList["lv up"],
                        "frameOut": 60,
                        "repeat": -1,
                    },
        
                    "params": {
                        "mult": 0.01,
                    },

                },

                "on": {

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["lv up"],
                        "suffixFunc": ["timeout"],

                        "timeout":{
                            "frameOut": 10,
                        },

                        "stage": "first",
                        "priority": 0,
                    },
        
                    "params": {
                        "mult": 0.01,
                    },

                },
    
            },
            "second stage": {
    
                "effect": {

                    "config": {
                        "func": this.effectsList["lv up"],
                        "frameOut": 1*60*60,
                        "repeat": 1,
                    },
        
                    "params": {
                        "mult": 2,
                    },

                },

                "on": {

                    "config": {

                        "prefixFunc": ["setAttributes"],
                        "func": this.effectsList["lv up"],
                        "suffixFunc": ["stopStages","deleteInstruction"],

                        "stage": "last",
                        "priority": 0,

                        "setAttributes": {
                            "attributes": {
                                "life": 25
                            }
                        },

                        "stopStages": {
                            "stages": ["last"],
                        }

                    },

                    "params": {
                        "mult": 2,
                    },

                },
    
            },
            "clone v1": {

                "effect": {
    
                    "config": {
                        "func": this.effectsList["clone"],
                        "frameOut": 1*60*60,
                        "repeat": 1,
                    },
        
                    "params": {
                        "mult": 0,
                    },

                },

                "on": {

                    "config": {

                        "prefixFunc": ["countDown"],
                        "func": this.effectsList["clone"],
                        "suffixFunc": ["timeout"],

                        "stage": "middle",
                        "priority": 5,

                        "timeout":{
                            "frameOut": 30*60,
                        },

                        "countDown": {
                            "function": ["deleteInstruction"],
                            "count": 2
                        }

                    },

                    "params": {
                        "mult": 0,
                    },

                },
    
            },
            "clone v0.5": {

                "effect": {
    
                    "config": {
                        "func": this.effectsList["clone"],
                        "frameOut": 1*60*60,
                        "repeat": 1,
                    },
        
                    "params": {
                        "mult": -0.5,
                    },

                },

                "on": {

                    "config": {

                        "prefixFunc": ["countDown"],
                        "func": this.effectsList["clone"],
                        "suffixFunc": ["timeout"],

                        "stage": "middle",
                        "priority": 5,

                        "timeout":{
                            "frameOut": 30*60,
                        },

                        "countDown": {
                            "function": ["deleteInstruction"],
                            "count": 2
                        }

                    },

                    "params": {
                        "mult": -0.5,
                    },

                },
    
            }, // delet?
            "illusion v1": {
    
                "effect": {

                    "config": {
                        "func": this.effectsList["illusion"],
                        "frameOut": 30,
                        "repeat": 2,
                    },
        
                    "params": {},

                },

                "on": {

                    "config": {

                        "prefixFunc": ["countDown"],
                        "func": this.effectsList["illusion"],
                        "suffixFunc": ["timeout"],

                        "stage": "middle",
                        "priority": 5,

                        "timeout":{
                            "frameOut": 5*60,
                        },

                        "countDown": {
                            "function": ["deleteInstruction"],
                            "count": 3
                        }

                    },

                    "params": {},
                
                }
    
            },
            "slowdown area": {

                "effect": {

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

                "on": {

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["slowdown"],
                        "suffixFunc": ["timeout"],

                        "stage": "middle",
                        "priority": 5,

                        "timeout":{
                            "frameOut": 15,
                        },

                    },

                    "params": {
                        "range": 175,
                        "mult": 1,
                    },

                }
    
            },
            "untouchable": {

                "effect": {

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

                "on": {

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["slowdown"],
                        "suffixFunc": [],

                        "stage": "middle",
                        "priority": 5,

                    },

                    "params": {
                        "range": 50,
                        "mult": 1,
                    },

                }
    
            },
            "deflet area": {
    
                "effect": {

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

                "on": {
                    

                    "config": {
                        "prefixFunc": [],
                        "func": this.effectsList["slowdown"],
                        "suffixFunc": ["timeout"],

                        "stage": "middle",
                        "priority": 5,

                        "timeout":{
                            "frameOut": 30,
                        },

                    },
        
                    "params": {
                        "range": 75,
                        "mult": 3,
                    },

                },
    
            },
            "help": {
    
                "effect": {

                    "config": {
                        "func": this.effectsList["reinforcements"],
                        "frameOut": 5*60,
                        "repeat": 4,
                    },
        
                    "params": {
                        "objectClass": MSP1,
                        "custom": undefined,
                    },

                },

                "on": {
                
                    "config": {

                        "prefixFunc": ["countDown"],
                        "func": this.effectsList["reinforcements"],
                        "suffixFunc": ["timeout"],

                        "stage": "first",
                        "priority": 0,

                        "timeout":{
                            "frameOut": 10*60,
                        },

                        "countDown": {
                            "function": ["deleteInstruction"],
                            "count": 10
                        }
                    },

                    "params": {
                        "objectClass": MSP1,
                        "custom": undefined,
                    }

                }
                
            },

            "d": {
    
                "config": {
                    "func": this.effectsList["dd"],
                    "frameOut": 1,
                    "repeat": -1,
                },
    
                "params": {
                },
                
            },

        },

        "negative": {

            "shock": {

                "effect": {

                    "config": {
                        "func": this.effectsList["thunder"],
                        "frameOut": 20,
                        "repeat": 1,
                    },
        
                    "params": {
                        "range": 300,
                        "thunderDamage": 100,
                        "mult": 0.5,
    
                        "color": "yellow",
                        "lineWidth": 4,
        
                        "effectName": "shock",
                        "frameOut": 20
                    },

                },

                "on": {

                    "config": {

                        "func": this.effectsList["thunder"],

                    },

                    "params": {
                        "range": 300,
                        "thunderDamage": 100,
                        "mult": 0.5,
    
                        "color": "yellow",
                        "lineWidth": 4,
        
                        "effectName": "shock",
                        "frameOut": 20
                    },


                },
    
            },

            "zeus": {

                "effect": {

                    "config": {
                        "func": this.effectsList["thunder"],
                        "frameOut": 5,
                        "repeat": 1,
                    },
        
                    "params": {
                        "range": 50,
                        "thunderDamage": 10,
                        "mult": 1.1,
    
                        "color": "yellow",
                        "lineWidth": 1,
        
                        "effectName": "zeus",
                        "frameOut": 5
                    },

                },

                "on": {
                    "config": {

                        "func": this.effectsList["thunder"],

                    },

                    "params": {
                        "range": 50,
                        "thunderDamage": 10,
                        "mult": 1.1,
    
                        "color": "yellow",
                        "lineWidth": 1,
        
                        "effectName": "zeus",
                        "frameOut": 5
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

var GenericEffects = new GenericEffectsController()