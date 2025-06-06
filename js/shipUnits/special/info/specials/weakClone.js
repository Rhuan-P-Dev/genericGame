
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
    cost = 150
    func = new SpecialController().clone
    reload = 1*60*60

    config = {
        "statsMult": -0.5
    }

}