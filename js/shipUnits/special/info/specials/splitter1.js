
import { InheritController } from "../../../../generalUtils/inherit.js"
import { SpecialController } from "../../specialController.js"
import { SpecialExtend } from "../extend/special.js"

export class Splitter1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SpecialExtend
            ],
            build
        )

    }

    name = "splitter 1"
    cost = 100
    func = new SpecialController().clone
    reload = 10*60

    config = {
        "statsMult": -0.2,
        "split": true,
    }

}