import { EffectsController } from "../../../../effects/effectsController.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Cryprwtrazghu_standard } from "./standard.js"

var Effects

onInit(function(){

    Effects = new EffectsController()

})

export class Freee {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Cryprwtrazghu_standard
            ],
            build
        )

        this.priority += 2

        this.graphicID = "freee"

    }

    passBuildList = {

        "add_Freee_special": (updateThis) => {

            Effects.add(
                "breathe",
                "effect",
                {
                    "object": updateThis,
                    "mult": 1,
                    "statName": "Energy",
                },{
                    "frameOut": 60,
                    "repeat": -1,
                }
            )

        },

    }

}