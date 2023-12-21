import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../forAllShipUnits/activateController.js"
import { DefenseExtend } from "../extend/defense.js"

export class SurviveInstinct1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend
            ],
            build
        )

    }

    name = "survive instinct 1"
    cost = 0
    func = new ActivateController().setStats
    reload = 2*60*60

    config = {

        stats: {
            "maxLife": 10,
            "maxEnergy": 10,
            "lifeRegen": 0.05,
            "energyRegen": 0.15,
            "shieldRegen": 0.1,
            "maxVel": 0.5,
            "vel": 0.02,
            "defense": 1,
            "resistance": -0.01,
            "damage": 5,
        },

        timer: 10*60

    }

}