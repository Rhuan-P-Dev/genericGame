import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../forAllShipUnits/activateController.js"
import { ShieldBoostAnimation } from "../animation/shieldBoostAnimation.js"
import { DefenseExtend } from "../extend/defense.js"

export class LittleShieldBoost {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend,
                ShieldBoostAnimation
            ],
            build
        )

    }

    subType = ["midTermBenefit"]

    name = "little shield boost"
    cost = 30
    func = new ActivateController().setStats
    reload = 1*60*60

    config = {

        stats: {
            "maxShield": 10,
            "shield": 5,
            "shieldRegen": 1 / (5 * 60),
        },

        timer: 45*60

    }

}