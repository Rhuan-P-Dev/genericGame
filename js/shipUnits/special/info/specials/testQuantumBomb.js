
import { InheritController } from "../../../../generalUtils/inherit.js"
import { SpecialController } from "../../specialController.js"
import { SpecialExtend } from "../extend/special.js"

export class TestQuantumBomb {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SpecialExtend
            ],
            build
        )

    }

    name = "test quantum bomb"
    cost = 100
    func = new SpecialController().quantumBomb
    reload = 60*60

    config = {
        "frameOut": 1*60,
        "range": 125,
        "damage": 200,
    }

}