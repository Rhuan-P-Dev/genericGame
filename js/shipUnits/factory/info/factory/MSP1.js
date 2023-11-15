import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Drone } from "../../../../object/complex/drone.js"
import { FactoryExtend } from "../extend/factory.js"

export class MSP1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend
            ],
            build
        )

    }

    name = "MSP1"
    cost = 50
    reload = 10*60

    config = {
        "objectClass": Drone,
        "AI": ["movable","useActivates"],
        "apply": {
            "weapon": ["P1"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority
    }

}