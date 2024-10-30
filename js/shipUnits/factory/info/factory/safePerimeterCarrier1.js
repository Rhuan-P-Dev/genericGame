import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { BigDrone } from "../../../../object/complex/bigDrone.js"
import { SafePerimeterCarrier1Effect } from "../effects/safePerimeterCarrier1Effect.js"
import { FactoryExtend } from "../extend/factory.js"

export class SafePerimeterCarrier1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend,
                SafePerimeterCarrier1Effect
            ],
            build
        )

    }

    name = "safe perimeter carrier 1"
    cost = 110
    reload = 40*60

    config = {
        "objectClass": BigDrone,
        "AI": ["missileV1","useActivates"],
        "activates": {
            "weapon": ["shotgun 1"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0,
    }

}