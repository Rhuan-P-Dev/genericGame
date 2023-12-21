import { InheritController } from "../../../../generalUtils/inherit.js"
import { DefenseController } from "../../defenseController.js"
import { DefenseExtend } from "../extend/defense.js"

export class EnergyShield {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend
            ],
            build
        )

    }

    name = "energy shield"
    cost = 0
    func = new DefenseController().energyShield
    reload = 1

    config = {

        position: [
            "middle",
            10
        ]
        
    }

}