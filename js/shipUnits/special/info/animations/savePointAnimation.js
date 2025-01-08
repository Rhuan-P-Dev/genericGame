import { InheritController } from "../../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../../graphics/animation/animationsController.js"
import { CommonImport } from "../../../../object/common/commonImport.js"

export class SavePointAnimation {

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
        "add_save_point_animation" : (updateThis) => {

            updateThis.preuseActivateObserver.add(
                (object, activate) => {

                    new AnimationsController().run({
                        "name":"save point",
                        "focus": {
                            "x": object.x,
                            "y": object.y,
                        },
                        "offset": {
                            "x": 0,
                            "y": 0,
                        },
                        "frameRandomOffsetX": 1,
                        "frameRandomOffsetY": 1,
                        "randomPointOffsetX": 1,
                        "randomPointOffsetY": 1,
                    })
                }
            )

        }

    }

}