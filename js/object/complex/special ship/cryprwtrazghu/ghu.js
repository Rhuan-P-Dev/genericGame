import { EffectsController } from "../../../../effects/effectsController.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Cryprwtrazghu_standard } from "./standard.js"

export class Ghu {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Cryprwtrazghu_standard
            ],
            build
        )

        this.maxLife *= 3

        this.graphicID = "ghu"

    }

    passBuildList = {

        "add_ghu_special": (updateThis) => {
           
            new EffectsController().add(
                "counterback",
                "onDamage",
                {
                    "object": updateThis,
                }
            )

        },

        "ghu_life": (updateThis) => {

            updateThis.life.math("*", 3)
    
        }

    }

}