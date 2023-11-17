
import { InheritController } from "../../../../generalUtils/inherit.js"
import { SpecialController } from "../../specialController.js"
import { SpecialExtend } from "../extend/special.js"

export class WeakClone {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SpecialExtend
            ],
            build
        )

    }

    name = "weak clone"
    cost = 50
    func = new SpecialController().weakClone
    reload = 1*60

    config = {
        "mult": -0.5
    }

}