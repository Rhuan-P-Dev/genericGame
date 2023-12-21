import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../forAllShipUnits/activateController.js"
import { DefenseExtend } from "../extend/defense.js"

export class LightDefense {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend
            ],
            build
        )

    }

    name = "light defense"
    cost = 25
    func = new ActivateController().setStats
    reload = 7*60

    config = {

        stats: {
            "defense": 1
        },

        timer: 10*60

    }

}