import { DamageController } from "../../damage/damageController.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { AnimationsController } from "../../graphics/animation/animationsController.js"
import { CommonImport } from "../common/commonImport.js"

var Animations
var Damage

onInit(function(){

    Animations = new AnimationsController()
    Damage = new DamageController()

})

export class PrimordialFlame {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                CommonImport
            ],
            build
        )

    }

    passBuildList = {

        "PrimordialFlame": (updateThis) => {

            Damage.addDamage(updateThis, "fire", 0.25)

            Animations.applyAnimations(
                updateThis,
                [{
                    "animationConfig": {
                        "name":"fire",
                        "frameRandomOffsetX": 0,
                        "frameRandomOffsetY": 0,
                        "randomPointOffsetX": 0,
                        "randomPointOffsetY": 0,
                    },
                    "loopConfig": {
                        "frameOut": 8
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
                true
            )

                        Animations.applyAnimations(
                updateThis,
                [{
                    "animationConfig": {
                        "name":"fire",
                        "frameRandomOffsetX": 0,
                        "frameRandomOffsetY": 0,
                        "randomPointOffsetX": 0,
                        "randomPointOffsetY": 0,
                    },
                    "loopConfig": {
                        "frameOut": 8
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
                
            )

            updateThis.addWeaponObserver.add(
                (weapon) => {

                    Damage.addDamage(
                        weapon,
                        "fire",
                        0.1,
                    )

                    weapon.animations = [
                        ...weapon.animations || [],
                        {
                            "animationConfig": {
                                "name":"fire",
                                "focus": {
                                },
                                "offset": {
                                },
                                "frameRandomOffsetX": 1,
                                "frameRandomOffsetY": 1,
                                "randomPointOffsetX": 0,
                                "randomPointOffsetY": 0,
                            },
                            "loopConfig": {
                                "frameOut": 10
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
                        }
                    ]

                }
            )

            Damage.immunityTo(updateThis, "fire")
            Damage.addDefense(updateThis, "life", "snow", 3)

        },

    }

}