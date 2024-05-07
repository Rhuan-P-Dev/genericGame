import { InheritController } from "../../../../generalUtils/inherit.js"
import { ActivateController } from "../../../forAllShipUnits/activateController.js"
import { EnergyShieldAnimation } from "../animation/energyShieldAnimation.js"
import { DefenseExtend } from "../extend/defense.js"

export class EfficientShield {

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

    name = "efficient shield"
    cost = 50
    func = new ActivateController().setStats
    reload = 20*60

    config = {
        
        stats: {
            "shield": 50
        }

    }

}