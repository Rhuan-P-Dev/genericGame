import { InheritController } from "../../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../../graphics/animation/animationsController.js"
import { CommonImport } from "../../../../object/common/commonImport.js"

export class DefenseShieldAnimation {

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
        "add_defense_shield_animation" : (updateThis) => {

            updateThis.useActivateObserver.add(
                (object, activate) => {

                    new AnimationsController().applyAnimations(
                        object,
                        [
                            {
                                "animationConfig": {
                                    "name":"defense shield",
                                    "focus": {},
                                    "offset": {},
                                    "frameRandomOffsetX": 0,
                                    "frameRandomOffsetY": 0,
                                    "randomPointOffsetX": 0,
                                    "randomPointOffsetY": 0,
                                },
                                "loopConfig": {
                                    "frameOut": 2,
                                    "repeat": updateThis.config.stats.defense / 1// 1 = minor defense shield value of the game
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