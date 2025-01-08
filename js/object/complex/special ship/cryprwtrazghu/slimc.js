import { EffectsController } from "../../../../effects/effectsController.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { GelatinousArmor } from "../../../uncommon/gelatinousArmor.js"
import { Cryprwtrazghu_standard } from "./standard.js"

var Effects

onInit(function(){

    Effects = new EffectsController()

})

export class Slimc {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Cryprwtrazghu_standard,
                GelatinousArmor
            ],
            build
        )

        this.priority += 1
        this.priority *= 1.25

        this.graphicID = "slime container"

    }

    passBuildList = {

        "add_Slimc_special": (updateThis) => {

            Effects.add(
                "slime spawner",
                "effect",
                {
                    "object": updateThis,
                },
            )

            Effects.add(
                "slime spawner",
                "onDeath",
                {
                    "object": updateThis,
                },
            )

        },

    }

}