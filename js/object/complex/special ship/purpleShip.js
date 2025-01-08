import { DamageController } from "../../../damage/damageController.js"
import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../graphics/animation/animationsController.js"
import { ComplexOnTypeFunctions } from "../../instructions/onInstructions.js"
import { RemnantResistance } from "../../uncommon/remnantResistance.js"
import { Ship } from "../ship.js"

var Damage
var Effects
var Animations

onInit(function(){

    Damage = new DamageController()
    Effects = new EffectsController()
    Animations = new AnimationsController()

})

/* Inspiration(s)

Overall idea: Purple guy from five night at freddy's
breakdown/final death: Pesadelo Sem Fim | Springtrap (FNAF) | ALBK - https://youtu.be/LOH-4X3mn08?si=8SHeyuwcy8IVU9ZD&t=185

*/

export class PurpleShip {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
                RemnantResistance
            ],
            build
        )

        this.graphicID = "purpleShip - 5"

        this.lifeRegen += 1/60

        this.defense *= 1.1

        this.damage *= 1.1

        this.maxLife *= 1.1

        this.maxEnergy *= 1.1
        this.energy *= 1.1
        this.energyRegen *= 1.25

        this.maxShield *= 1.5
        this.shield *= 1.5
        this.shieldRegen *= 2

        this.resistance -= 0.01

        Damage.addDefense(this, "life", "fire", -0.1)

        Damage.addDefense(
            this,
            "shield",
            "fire",
            -0.1
        )

    }

    deathTransitions = {
        "purpleShip - 5": "purpleShip - 4",
        "purpleShip - 4": "purpleShip - 3",
        "purpleShip - 3": "purpleShip - 2",
        "purpleShip - 2": "purpleShip - 1",
        "purpleShip - 1": "purpleShip - 0"

    }

    passBuildList = {

        "PurpleShip_life": (updateThis) => {

            updateThis.life.math("*", 1.1)

        },

        "PurpleShip_special": (updateThis) => {

            let upStats = {
                "prefixFunc": [],
                "func": (params) => {

                    params.object.graphicID = params.object.deathTransitions[params.object.graphicID]

                    params.object.priority *= 1.2

                    params.object.lifeRegen += 1/60

                    params.object.defense *= 1.1

                    params.object.damage *= 1.1

                    params.object.maxLife *= 1.1

                    params.object.maxEnergy *= 1.1
                    params.object.energy *= 1.1
                    params.object.energyRegen *= 1.1

                    params.object.maxShield *= 1.1
                    params.object.shield *= 1.1
                    params.object.shieldRegen *= 1.1

                    params.object.resistance -= 0.01

                    Damage.addDefense(
                        params.object,
                        "life",
                        "fire",
                        -0.1
                    )

                    Damage.addDefense(
                        params.object,
                        "shield",
                        "fire",
                        -0.1
                    )

                    params.object.shield = params.object.maxShield

                    params.object.life.set(
                        params.object.maxLife
                    )

                    Animations.applyAnimations(
                        params.object,
                        [{
                            "animationConfig": {
                                "name":"purpleShip's death",
                                "frameRandomOffsetX": 0,
                                "frameRandomOffsetY": 0,
                                "randomPointOffsetX": 0,
                                "randomPointOffsetY": 0,
                            },
                            "loopConfig": {
                                "frameOut":1,
                                "repeat": 1,
                            },
                            "runTimeBuild": (object, animationConfig, loopConfig) => {
                
                                animationConfig.focus = object
                
                                animationConfig.offset = {
                                    "x": 0,
                                    "y": 0,
                                }
                
                            }
                        }],
                        false
                    )

                },
                "suffixFunc": ["stopStages","countDown"],

                "stopStages": {
                    "stages": ["last"],
                },

                "stage": "last",
                "priority": 5,

                "countDown": {
                    "countDownFunction": ["deleteInstruction"],
                    "count": 4
                }

            }

            new ComplexOnTypeFunctions().apply(upStats)

            updateThis.onDeath.add(
                upStats,
                upStats.stage,
                upStats.priority
            )

            let breakdown = {
                "prefixFunc": [],
                "func": (params) => {

                    params.object.life.set(
                        params.object.maxLife
                    )

                    params.object.lifeRegen = -(params.object.maxLife/(8*60))

                    Effects.add(
                        "attraction",
                        "effect",
                        {
                            "object": params.object,
                            "searchConfig": {
                                "includeSameTeam": false,
                                "includeEnemyTeam": true,
                                "includeYourself": false,
                                "maxDistance": 350,
                            },

                            "range": 350,
                            "mult": 1,
                            "force": 1,
                        },{
                            "frameOut": 20,
                        }
                    )

                    Effects.add(
                        "purpleShip's breakdown",
                        "effect",
                        {
                            "object": params.object,
                        }
                    )

                    Animations.applyAnimations(
                        params.object,
                        [{
                            "animationConfig": {
                                "name":"fire",
                                "frameRandomOffsetX": 0,
                                "frameRandomOffsetY": 0,
                                "randomPointOffsetX": 0,
                                "randomPointOffsetY": 0,
                            },
                            "loopConfig": {
                                "frameOut": 1
                            },
                            "runTimeBuild": (object, animationConfig, loopConfig) => {
                
                                animationConfig.focus = {
                                    "x": object.x,
                                    "y": object.y,
                                }
                
                                animationConfig.offset = {
                                    "x": randomInterval(object.width),
                                    "y": randomInterval(object.height),
                                }
                
                            }
                        }],
                        false
                    )

                    Animations.applyAnimations(
                        params.object,
                        [{
                            "animationConfig": {
                                "name":"purpleShip's final death",
                                "frameRandomOffsetX": 0,
                                "frameRandomOffsetY": 0,
                                "randomPointOffsetX": 0,
                                "randomPointOffsetY": 0,
                            },
                            "loopConfig": {
                                "frameOut":1,
                                "repeat": 1,
                            },
                            "runTimeBuild": (object, animationConfig, loopConfig) => {
                
                                animationConfig.focus = object
                
                                animationConfig.offset = {
                                    "x": randomInterval(object.width),
                                    "y": randomInterval(object.height),
                                }
                
                            }
                        }],
                        false
                    )

                },
                "suffixFunc": ["stopStages","deleteInstruction"],

                "stopStages": {
                    "stages": ["last"],
                },

                "stage": "last",
                "priority": 6,

            }

            new ComplexOnTypeFunctions().apply(breakdown)

            updateThis.onDeath.add(
                breakdown,
                breakdown.stage,
                breakdown.priority
            )

        },

    }

}