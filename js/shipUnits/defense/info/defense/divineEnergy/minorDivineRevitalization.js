import { InheritController } from "../../../../../generalUtils/inherit.js"
import { DefenseController } from "../../../defenseController.js"
import { DefenseExtend } from "../../extend/defense.js"

export class MinorDivineRevitalization {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend
            ],
            build
        )

    }

    subType = ["lifeGuard"]

    // wrong
    consumableStat = "divineEnergy"

    name = "minor divine revitalization"
    cost = 30
    func = new DefenseController().healOther
    reload = 1*60

    config = {

        "heal": 100,

        "stats": [
            "life",
            "shield",
            "energy",
        ],

        "range": 200,
        "color": "yellow"

    }

}