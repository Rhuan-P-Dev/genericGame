import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../forAllShipUnits/activateController.js"
import { BandAidAnimation } from "../animation/regenerationAnimation.js"
import { DefenseExtend } from "../extend/defense.js"

export class Regen {

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

    name = "regen"
    cost = 20
    func = new ActivateController().setStats
    reload = 60

    config = {

        stats: {
            "lifeRegen": 10 / (1 * 60),
            "energyRegen": -(10 / (1 * 60)),
        },

        timer: 2*60

    }

}