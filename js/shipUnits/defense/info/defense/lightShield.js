import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../forAllShipUnits/activateController.js"
import { DefenseExtend } from "../extend/defense.js"

export class LightShield {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend
            ],
            build
        )

    }

    name = "light shield"
    cost = 20
    func = new ActivateController().setStats
    reload = 30

    config = {

        stats: {
            "shield": 5
        }

    }

}