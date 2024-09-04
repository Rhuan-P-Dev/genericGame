import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../forAllShipUnits/activateController.js"
import { TauntAnimation } from "../animations/tauntAnimation.js"
import { SpecialExtend } from "../extend/special.js"

export class BasicTaunt {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SpecialExtend,
                TauntAnimation
            ],
            build
        )

    }

    subType = ["tank"]

    name = "basic taunt"
    cost = 20
    func = new ActivateController().setStats
    reload = 30*60

    config = {

        stats: {
            "priority": 1,
        },

        timer: 5*60

    }

}