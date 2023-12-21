import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../forAllShipUnits/activateController.js"
import { SpecialExtend } from "../extend/special.js"

export class BasicCamouflage {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SpecialExtend
            ],
            build
        )

    }

    name = "basic camouflage"
    cost = 20
    func = new ActivateController().setStats
    reload = 30*60

    config = {

        stats: {
            "priority": -1,
        },

        timer: 5*60

    }

}