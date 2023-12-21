import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { BigDrone } from "../../../../object/complex/bigDrone.js"
import { FactoryExtend } from "../extend/factory.js"

export class WarPromoter1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend,
            ],
            build
        )

    }

    name = "war promoter 1"
    cost = 100
    reload = 10*60

    config = {
        "objectClass": BigDrone,
        "AI": ["movable","useActivates"],
        "activates": {
            "weapon": ["scrapper 1","scrapper 1"],
            "factory": ["movable scrapper 1"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0,
    }

}