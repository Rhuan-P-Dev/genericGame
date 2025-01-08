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

    subType = ["regen","midTermBenefit"]

    name = "band aid"
    cost = 60
    func = new ActivateController().setStats
    reload = 10*60

    config = {

        stats: {
            "lifeRegen": 1 / (1 * 60),
        },

        timer: 100*60

    }

}