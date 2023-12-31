import { InheritController } from "../../../../generalUtils/inherit.js"
import { DefenseController } from "../../defenseController.js"
import { DefenseExtend } from "../extend/defense.js"

export class HealPulse1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend
            ],
            build
        )

    }

    name = "heal pulse 1"
    cost = 30
    func = new DefenseController().healOther
    reload = 1*60

    config = {

        heal: 5,

        range: 100

    }

}