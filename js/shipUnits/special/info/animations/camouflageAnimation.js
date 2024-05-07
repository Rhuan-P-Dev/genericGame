import { InheritController } from "../../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../../graphics/animation/animationsController.js"
import { CommonImport } from "../../../../object/common/commonImport.js"

export class CamouflageAnimation {

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
                                    "name":"camuflage",
                                    "focus": {},
                                    "offset": {},
                                    "frameRandomOffsetX": 0,
                                    "frameRandomOffsetY": 0,
                                    "randomPointOffsetX": 0,
                                    "randomPointOffsetY": 0,
                                },
                                "loopConfig": {
                                    "frameOut": 1,
                                    "repeat": 20
                                },
                                "runTimeBuild": (object, animationConfig, loopConfig) => {
                    
                                    animationConfig.focus = {
                                        "x": object.x,
                                        "y": object.y,
                                    }
                    
                                    animationConfig.offset = {
                                        "x": randomInterval(object.width)*2.25,
                                        "y": randomInterval(object.height)*2.25,
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