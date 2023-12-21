import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { BigDrone } from "../../../../object/complex/bigDrone.js"
import { FactoryExtend } from "../extend/factory.js"

export class VanguardHelper1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend,
            ],
            build
        )

    }

    name = "vanguard helper 1"
    cost = 125
    reload = 40*60

    config = {
        "objectClass": BigDrone,
        "AI": ["movable","useActivates"],
        "activates": {
            "factory": ["tank 1"],
            "defense": ["heal pulse 1"],
            "weapon": ["auto toy machinegun"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0,
    }

}