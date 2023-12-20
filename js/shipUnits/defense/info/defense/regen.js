import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../forAllShipUnits/activateController.js"
import { DefenseExtend } from "../extend/defense.js"

export class Regen {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend
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
            "lifeRegen": 0.17,
            "energyRegen": -0.17,
        },

        timer: 2*60

    }

}