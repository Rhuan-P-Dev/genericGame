import { EffectsController } from "../../../../effects/effectsController.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Cryprwtrazghu_standard } from "./standard.js"

var Effects

onInit(function(){

    Effects = new EffectsController()

})

export class SoulSplit {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Cryprwtrazghu_standard,
            ],
            build
        )

        this.priority += 1
        this.priority *= 1.25

        this.graphicID = "soul split"

    }

    passBuildList = {

        "add_SoulSplit_special": (updateThis) => {

            Effects.add(
                "infinite replicant",
                "effect",
                {
                    "object": updateThis,
                },
            )

        },

    }

}