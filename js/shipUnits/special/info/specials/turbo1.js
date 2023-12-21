import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../forAllShipUnits/activateController.js"
import { SpecialExtend } from "../extend/special.js"

export class Turbo1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SpecialExtend
            ],
            build
        )

    }

    name = "turbo 1"
    cost = 20
    func = new ActivateController().setPercentageStats
    reload = 30*60

    config = {

        stats: {
            "vel": 0.01,
        },

        timer: 15*60

    }

}