import { InheritController } from "../../../../generalUtils/inherit.js"
import { DefenseController } from "../../defenseController.js"
import { DefenseExtend } from "../extend/defense.js"

export class Resilience1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend
            ],
            build
        )

    }

    name = "resilience 1"
    cost = 150
    func = new DefenseController().growth
    reload = 30*60

    config = {

        "stats": [
            "maxLife",
        ],

        "percentage": 0.1

    }

}