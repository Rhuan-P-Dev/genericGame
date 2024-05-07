import { InheritController } from "../../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../../graphics/animation/animationsController.js"
import { CommonImport } from "../../../../object/common/commonImport.js"

export class EnergyShieldAnimation {

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
        "add_energy_shield_animation" : (updateThis) => {

            updateThis.useActivateObserver.add(
                (object, activate) => {

                    new AnimationsController().applyAnimations(
                        object,
                        [
                            {
                                "animationConfig": {
                                    "name":"energy shield",
                                    "focus": {},
                                    "offset": {},
                                    "frameRandomOffsetX": 0,
                                    "frameRandomOffsetY": 0,
                                    "randomPointOffsetX": 0,
                                    "randomPointOffsetY": 0,
                                },
                                "loopConfig": {
                                    "frameOut": 2,
                                    "repeat": updateThis.config.stats.shield / 5// 5 = minor shield value of the game
                                },
                                "runTimeBuild": (object, animationConfig, loopConfig) => {
                    
                                    animationConfig.focus = {
                                        "x": object.x,
                                        "y": object.y
                                    }
                    
                                    animationConfig.offset = {
                                        "y": randomInterval(object.height*2.25),
                                        "x": randomInterval(object.width*2.25)
                                    }
                    
                                }
                            }
                    
                        ]
                    )

                }
            )

        }

    }

}