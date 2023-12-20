import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../forAllShipUnits/activateController.js"
import { SpecialExtend } from "../extend/special.js"

export class Overclock {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SpecialExtend
            ],
            build
        )

    }

    name = "overclock"
    cost = 0
    func = new ActivateController().setStats
    reload = 10

    config = {

        stats: {
            "lifeRegen": -0.05,
            "energyRegen": 0.1,
        },

        timer: 10*60

    }

}