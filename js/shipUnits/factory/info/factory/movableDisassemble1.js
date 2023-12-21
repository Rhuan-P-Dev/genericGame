import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { DroneV2 } from "../../../../object/complex/droneV2.js"
import { FactoryExtend } from "../extend/factory.js"

export class MovableDisassemble1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend
            ],
            build
        )

    }

    name = "movable disassemble 1"
    cost = 80
    reload = 7*60

    currentVelMult = 0

    config = {
        "objectClass": DroneV2,
        "AI": ["movable","useActivates"],
        "activates": {
            "weapon": ["disassemble 1"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0
    }

}