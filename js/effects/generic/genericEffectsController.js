import { AIUtilsController } from "../../AI/utils/AIUtils.js"
import { FrameController } from "../../frame/frameController.js"
import { MathController } from "../../generalUtils/math.js"
import { ScreenRenderController } from "../../graphics/screenRenderController.js"
import { ShipCreatorController } from "../../ship/shipCreatorController.js"
import { SpecialController } from "../../shipUnits/special/specialController.js"
import { EffectsController } from "../effectsController.js"

var Frame = ""
var AIUtils = ""
var ScreenRender = ""
var Special = ""
var ShipCreator = ""
var Math = ""
var Effects = ""

onInit(function(){

    Frame = new FrameController()
    AIUtils = new AIUtilsController()
    ScreenRender = new ScreenRenderController()
    Special = new SpecialController()
    ShipCreator = new ShipCreatorController()
    Math = new MathController()
    Effects = new EffectsController()

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

        },

        "reinforcements": (params) => {

            ShipCreator.createShip(params.object.team, ["movable","turret"]).color = "purple"

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
                            "start": params.object,
                            "goal": closestObject,
                        }
                    }

                )

                Effects.add(
                    "in shock",
                    "effect",
                    {
                        "object": closestObject,
                        "range": params.range/params.div,
                        "damage": params.damage/params.div,
                        "div": params.div
                    }
                )

            }

        },

    }

    effectsInfo = {

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
                "frameOut": 600,
                "repeat": -1,
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
        "in shock": {

            "config": {
                "func": this.effectsList["thunder"],
                "frameOut": 10,
                "repeat": 1,
            },

            "params": {
                "range": 1500,
                "damage": 100,
                "div": 2,
            },

        },
        "help": {

            "config": {
                "func": this.effectsList["reinforcements"],
                "frameOut": 60,
                "repeat": 1,
            },

            "params": {
            },
            
        }

    }

    getAll(){
        return this.effectsInfo
    }

    get(effectName){
        return this.effectsInfo[effectName]
    }

}

var GenericEffects = new GenericEffectsController()