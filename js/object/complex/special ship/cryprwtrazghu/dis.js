import { EffectsController } from "../../../../effects/effectsController.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Cryprwtrazghu_standard } from "./standard.js"

export class Dis {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Cryprwtrazghu_standard
            ],
            build
        )

        this.priority += 1

        this.graphicID = "distributor"

        this.maxLife *= 1.25

    }

    passBuildList = {

        "add_Dis_special": (updateThis) => {

            new EffectsController().add(
                "distributor",
                "onDamage",
                {
                    "object": updateThis
                },
            )

        },

        "Distributor_life": (updateThis) => {

            updateThis.life.math("*", 1.25)
    
        }

    }

}