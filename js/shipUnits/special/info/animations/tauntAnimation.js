import { InheritController } from "../../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../../graphics/animation/animationsController.js"
import { CommonImport } from "../../../../object/common/commonImport.js"

export class TauntAnimation {

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
        "add_camouflage_animation" : (updateThis) => {

            updateThis.preuseActivateObserver.add(
                (object, activate) => {

                    new AnimationsController().applyAnimations(
                        object,
                        [
                            {
                                "animationConfig": {
                                    "name":"taunt",
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
                                        "x": 0,
                                        "y": -object.height*2.25,
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