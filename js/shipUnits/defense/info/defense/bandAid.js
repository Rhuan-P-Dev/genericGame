import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../forAllShipUnits/activateController.js"
import { BandAidAnimation } from "../animation/regenerationAnimation.js"
import { DefenseExtend } from "../extend/defense.js"

export class BandAid {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend,
                BandAidAnimation
            ],
            build
        )

    }

    name = "band aid"
    cost = 50
    func = new ActivateController().setStats
    reload = 5*60

    config = {

        stats: {
            "lifeRegen": 1 / (1 * 60),
        },

        timer: 100*60

    }

}