import { InheritController } from "../../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../../graphics/animation/animationsController.js"
import { CommonImport } from "../../../../object/common/commonImport.js"

export class BandAidAnimation {

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
        "add_band aid_animation" : (updateThis) => {

            updateThis.useActivateObserver.add(
                (object, activate) => {

                    new AnimationsController().applyAnimations(
                        object,
                        [
                            {
                                "animationConfig": {
                                    "name":"heal",
                                    "focus": {},
                                    "offset": {},
                                    "frameRandomOffsetX": 0,
                                    "frameRandomOffsetY": 0,
                                    "randomPointOffsetX": 0,
                                    "randomPointOffsetY": 0,
                                },
                                "loopConfig": {
                                    "frameOut": 60 / (updateThis.config.stats.lifeRegen*60),
                                    "repeat": (updateThis.config.timer / 60) * (updateThis.config.stats.lifeRegen*60)
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