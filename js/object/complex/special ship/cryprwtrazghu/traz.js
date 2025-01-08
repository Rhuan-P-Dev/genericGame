import { EffectsController } from "../../../../effects/effectsController.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Cryprwtrazghu_standard } from "./standard.js"

export class Traz {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Cryprwtrazghu_standard
            ],
            build
        )

        this.graphicID = "traz"

        this.energy *= 2
        this.maxEnergy *= 2

    }

    passBuildList = {

        "add_traz_special": (updateThis) => {
           
            new EffectsController().add(
                "energy shield of faith",
                "onDamage",
                {
                    "object": updateThis,
                }
            )
        },

    }

}