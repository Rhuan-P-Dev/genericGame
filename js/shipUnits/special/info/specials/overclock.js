import { InheritController } from "../../../../generalUtils/inherit.js"
import { SpecialController } from "../../specialController.js"
import { SpecialExtend } from "../extend/special.js"

export class Overclock {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SpecialExtend
            ],
            build
        )

    }

    name = "overclock"
    cost = 0
    func = new SpecialController().overclock
    reload = 10

    config = {
        "overclockMult": 0.1,
        "overclockDiv": 2,
    }

}