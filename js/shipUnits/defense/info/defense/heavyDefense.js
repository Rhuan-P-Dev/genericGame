import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../forAllShipUnits/activateController.js"
import { DefenseExtend } from "../extend/defense.js"

export class HeavyDefense {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend
            ],
            build
        )

    }

    name = "heavy defense"
    cost = 150
    func = new ActivateController().setStats
    reload = 20*60

    config = {

        stats: {
            "defense": 10
        },

        timer: 15*60

    }

}