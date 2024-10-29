import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../forAllShipUnits/activateController.js"
import { TacticUpgradeAnimation } from "../animation/tacticUpgradeAnimation.js"
import { DefenseExtend } from "../extend/defense.js"

export class TacticUpgrade1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend,
                TacticUpgradeAnimation
            ],
            build
        )

    }

    subType = ["longTermBenefit"]

    name = "tactic upgrade 1"
    cost = 100
    func = new ActivateController().setStats
    reload = 2*60*60

    config = {

        stats: {
            "maxLife": 10,
            "maxEnergy": 20,
            "maxShield": 5,
            "energyRegen": 2 / (1 * 60),
            "shieldRegen": 1 / (1 * 60),
            "maxVel": 0.05,
            "vel": 0.01,
            "defense": 1,
            "resistance": -0.01,
            "damage": 1,
        },

    }

}