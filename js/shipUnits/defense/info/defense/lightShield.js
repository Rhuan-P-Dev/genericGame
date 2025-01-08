import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../forAllShipUnits/activateController.js"
import { EnergyShieldAnimation } from "../animation/energyShieldAnimation.js"
import { DefenseExtend } from "../extend/defense.js"

export class LightShield {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend,
                EnergyShieldAnimation
            ],
            build
        )

    }

    subType = ["shield"]

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