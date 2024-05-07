import { InheritController } from "../../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../../graphics/animation/animationsController.js"
import { CommonImport } from "../../../../object/common/commonImport.js"

export class TeleportAnimation {

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
        "add_teleport_animation" : (updateThis) => {

            updateThis.preuseActivateObserver.add(
                (object, activate) => {

                    new AnimationsController().run({
                        "name":"teleport",
                        "focus": {
                            "x": object.x,
                            "y": object.y,
                        },
                        "offset": {
                            "x": 0,
                            "y": 0,
                        },
                        "frameRandomOffsetX": 0,
                        "frameRandomOffsetY": 0,
                        "randomPointOffsetX": 0,
                        "randomPointOffsetY": 0,
                    })
                }
            )

            updateThis.useActivateObserver.add(
                (object, activate) => {
                    
                    new AnimationsController().run({
                        "name":"teleport",
                        "focus": {
                            "x": object.x,
                            "y": object.y,
                        },
                        "offset": {
                            "x": randomInteger(-0, 0),
                            "y": randomInteger(-0, 0),
                        },
                        "frameRandomOffsetX": 0,
                        "frameRandomOffsetY": 0,
                        "randomPointOffsetX": 0,
                        "randomPointOffsetY": 0,
                    })

                }
            )
    
        }

    }

}