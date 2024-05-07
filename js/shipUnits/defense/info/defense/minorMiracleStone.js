import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../forAllShipUnits/activateController.js"
import { MiracleStoneAnimation } from "../animation/miracleStoneAnimation.js"
import { DefenseExtend } from "../extend/defense.js"

export class MinorMiracleStone {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend,
                MiracleStoneAnimation
            ],
            build
        )

    }

    name = "minor miracle stone"
    cost = 0
    func = new ActivateController().setPercentageStats
    reload = 1*60*60

    config = {

        stats: {
            "life": 0.1,
            "energy": 0.1,
            "shield": 0.1,
        },

    }

}