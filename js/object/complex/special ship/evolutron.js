import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { SwitchStatsController } from "../../../misc/switchStatsController.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { Ship } from "../ship.js"

var Effects
var ObjectActivates
var SwitchStats

onInit(function(){

    Effects = new EffectsController()
    ObjectActivates = new ObjectActivatesController()
    SwitchStats = new SwitchStatsController()

})

export class Evolutron{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
            ],
            build
        )

        this.graphicID = "evolutron - upscale"

        this.priority *= 1.4

        this.width *= 1.25
        this.height *= 1.25

        this.maxLife *= 0.75

        this.energy *= 0.75
        this.energyRegen *= 0.75
        this.maxEnergy *= 0.75

        this.defense *= 0.75
        this.damage *= 0.75
        this.vel *= 0.75
        this.maxVel *= 0.75

    }

    passBuildList = {

        "add_Evolutron_special": (updateThis) => {

            Effects.add(
                "evolutron",
                "effect",
                {
                    "object": updateThis,
                },{
                    "frameOut": 5*60,
                    "repeat": -1,
                }
            )

            Effects.add(
                "breathe",
                "effect",
                {
                    "object": updateThis,
                },{
                    "frameOut": 60,
                    "repeat": -1,
                }
            )

            Effects.add(
                "heart beat",
                "effect",
                {
                    "object": updateThis,
                },{
                    "frameOut": 60,
                    "repeat": -1,
                }
            )

            Effects.add(
                "defense evolution",
                "onDamage",
                {
                    "object": updateThis,
                    "percentage": 0.001
                },
            )

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "factory", "upgrader 3")
                    ObjectActivates.giveActivate(object, "special", "lv up")
                    ObjectActivates.giveActivate(object, "defense", "tactic upgrade 1")
                    ObjectActivates.giveActivate(object, "defense", "resilience 1")
                    ObjectActivates.giveActivate(object, "defense", "survive instinct 1")
                }
            )

            SwitchStats.add(
                    updateThis,
                    "life",
                    [
                        {
                            "flag": 0.75,
                            "max": "maxLife",
                            "state": true,
                            "above": (params) => {
                                Effects.remove(
                                    params.object,
                                    params.belowReturn
                                )
                                return "above"
                            },
                            "below": (params) => {
                                let below = Effects.add(
                                    "breathe",
                                    "effect",
                                    {
                                        "object": params.object,
                                    },{
                                        "frameOut": 60,
                                        "repeat": -1,
                                    }
                                )
                                return below
                            }
                        },{
                            "flag": 0.5,
                            "max": "maxLife",
                            "state": true,
                            "above": (params) => {
                                Effects.remove(
                                    params.object,
                                    params.belowReturn
                                )
                                return "above"
                            },
                            "below": (params) => {
                                let below = Effects.add(
                                    "heart beat",
                                    "effect",
                                    {
                                        "object": params.object,
                                    },{
                                        "frameOut": 60,
                                        "repeat": -1,
                                    }
                                )
                                return below
                            }
                        },{
                            "flag": 0.25,
                            "max": "maxLife",
                            "state": true,
                            "above": (params) => {
                                Effects.remove(
                                    params.object,
                                    params.belowReturn
                                )
                                return "above"
                            },
                            "below": (params) => {
                                let below = Effects.add(
                                    "breathe",
                                    "effect",
                                    {
                                        "object": params.object,
                                    },{
                                        "frameOut": 60,
                                        "repeat": -1,
                                    }
                                )
                                return below
                            }
                        },{
                            "flag": 0.1,
                            "max": "maxLife",
                            "state": true,
                            "above": (params) => {
                                Effects.remove(
                                    params.object,
                                    params.belowReturn
                                )
                                return "above"
                            },
                            "below": (params) => {
                                let below = Effects.add(
                                    "heart beat",
                                    "effect",
                                    {
                                        "object": params.object,
                                    },{
                                        "frameOut": 60,
                                        "repeat": -1,
                                    }
                                )
                                return below
                            }
                        },
                    ]
            )

        },

        "Evolutron_life": (updateThis) => {

            updateThis.life.math("*", 0.75)

        },

    }

}