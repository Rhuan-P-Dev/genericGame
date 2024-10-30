import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Drone } from "../../../../object/complex/drone.js"
import { FactoryExtend } from "../extend/factory.js"

export class MovableScrapper1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend,
            ],
            build
        )

    }

    name = "movable scrapper 1"
    cost = 35
    reload = 18*60

    config = {
        "objectClass": Drone,
        "AI": ["movable","useActivates"],
        "activates": {
            "weapon": ["scrapper 1"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0,
    }

}