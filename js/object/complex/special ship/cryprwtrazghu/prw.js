import { EffectsController } from "../../../../effects/effectsController.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Cryprwtrazghu_standard } from "./standard.js"

export class Prw {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Cryprwtrazghu_standard
            ],
            build
        )

        this.graphicID = "prw"

    }

    passBuildList = {

        "add_pwr_special": (updateThis) => {
           
            new EffectsController().add(
                "second stage",
                "effect",
                {
                    "object": updateThis
                },
            )

        },

    }

}