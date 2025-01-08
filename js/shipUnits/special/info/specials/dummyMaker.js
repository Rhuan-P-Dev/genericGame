
import { InheritController } from "../../../../generalUtils/inherit.js"
import { SpecialController } from "../../specialController.js"
import { SpecialExtend } from "../extend/special.js"

export class DummyMaker {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SpecialExtend
            ],
            build
        )

    }

    subType = ["evasive"]

    name = "dummy maker"
    cost = 25
    func = new SpecialController().distractionDummy
    reload = 30*60

    currentVelMult = 0

    config = {

        "scale": 8,

        "graphicID": "ship",

        "life": 100,
        "defense": 1,
        "priority": 5
    }

}