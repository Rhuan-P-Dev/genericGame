import { InheritController } from "../../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../../graphics/animation/animationsController.js"
import { CommonImport } from "../../../../object/common/commonImport.js"

export class SurviveInstinctAnimation {

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
        "add_survive_instinct_animation" : (updateThis) => {

            updateThis.useActivateObserver.add(
                (object, activate) => {

                    new AnimationsController().applyAnimations(
                        object,
                        [
                            {
                                "animationConfig": {
                                    "name":"survive instinct",
                                    "focus": {},
                                    "offset": {},
                                    "frameRandomOffsetX": 0,
                                    "frameRandomOffsetY": 0,
                                    "randomPointOffsetX": 0,
                                    "randomPointOffsetY": 0,
                                },
                                "loopConfig": {
                                    "frameOut": 1,
                                    "repeat": 1
                                },
                                "runTimeBuild": (object, animationConfig, loopConfig) => {
                    
                                    animationConfig.focus = object
                    
                                    animationConfig.offset = {
                                        "y": 0,
                                        "x": 0
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