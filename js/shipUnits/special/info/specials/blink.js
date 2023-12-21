
import { InheritController } from "../../../../generalUtils/inherit.js"
import { SpecialController } from "../../specialController.js"
import { SpecialExtend } from "../extend/special.js"

export class Blink {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SpecialExtend
            ],
            build
        )

    }

    name = "blink"
    cost = 30
    func = new SpecialController().teleport
    reload = 1*60

    config = {
        "distance": 50
    }

}