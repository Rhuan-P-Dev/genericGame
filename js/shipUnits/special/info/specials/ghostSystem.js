import { InheritController } from "../../../../generalUtils/inherit.js"
import { SpecialController } from "../../specialController.js"
import { SpecialExtend } from "../extend/special.js"

export class GhostSystem {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SpecialExtend
            ],
            build
        )

    }

    subType = ["dodge"]

    name = "ghost system"
    cost = 2
    func = new SpecialController().invulnerabilitySystem
    reload = 1

    config = {

        onHit: {

            "stage": "first",
            "priority": -10,

        },

        onDamage: {

            "stage": "first",
            "priority": -10,

        }
        

    }

}