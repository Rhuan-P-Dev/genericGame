import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../forAllShipUnits/activateController.js"
import { FortificationAnimation } from "../animation/fortificationAnimation.js"
import { DefenseExtend } from "../extend/defense.js"

export class BasicFortificationModule {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend,
                FortificationAnimation
            ],
            build
        )

    }

    name = "basic fortification module"
    cost = 2
    func = new ActivateController().setStats
    reload = 2

    config = {

        stats: {
            "defense": 2,
            "resistance": -0.05,
        },

        timer: 2

    }

}