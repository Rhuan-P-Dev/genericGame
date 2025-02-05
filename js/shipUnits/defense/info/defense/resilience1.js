import { InheritController } from "../../../../generalUtils/inherit.js"
import { DefenseController } from "../../defenseController.js"
import { ResilienceAnimation } from "../animation/resilienceAnimation.js"
import { DefenseExtend } from "../extend/defense.js"

export class Resilience1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend,
                ResilienceAnimation
            ],
            build
        )

    }

    subType = ["longTermBenefit"]

    name = "resilience 1"
    cost = 150
    func = new DefenseController().growth
    reload = 1.5*60*60

    config = {

        "stats": [
            "maxLife",
        ],

        "percentage": 0.1

    }

}