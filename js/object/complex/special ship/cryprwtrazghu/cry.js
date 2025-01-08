import { EffectsController } from "../../../../effects/effectsController.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Cryprwtrazghu_standard } from "./standard.js"

export class Cry {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Cryprwtrazghu_standard
            ],
            build
        )

        this.graphicID = "cry"

    }

    passBuildList = {

        "add_cry_special": (updateThis) => {
           
            new EffectsController().add(
                "deflet area",
                "effect",
                {
                    "object": updateThis
                },
            )

        },

    }

}