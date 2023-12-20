import { FocusedNearBehavior } from "../../../../AI/behavior/focusedNearBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Drone } from "../../../../object/complex/drone.js"
import { FactoryExtend } from "../extend/factory.js"

export class MovableSaferPerimeter1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend
            ],
            build
        )

    }

    name = "movable safer perimeter 1"
    cost = 35
    reload = 10*60

    config = {
        "objectClass": Drone,
        "AI": ["movable","useActivates"],
        "activates": {
            "weapon": ["piston 1"],
        },
        "behavior": new FocusedNearBehavior().searchPriority,
        "statsMult": 0,
    }

}