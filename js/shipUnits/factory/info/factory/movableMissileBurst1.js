import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Drone } from "../../../../object/complex/drone.js"
import { FactoryExtend } from "../extend/factory.js"

export class MovableMissileBurst1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend
            ],
            build
        )

    }

    name = "movable missile burst 1"
    cost = 80
    reload = 15*60

    currentVelMult = 0

    config = {
        "objectClass": Drone,
        "AI": ["movable","useActivates"],
        "activates": {
            "weapon": ["missile burst 1"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0
    }

}