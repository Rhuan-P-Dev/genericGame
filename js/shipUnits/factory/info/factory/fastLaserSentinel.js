import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { DroneSentinel } from "../../../../object/complex/special drone/droneSentinel.js"
import { FactoryExtend } from "../extend/factory.js"

export class FastLaserSentinel {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend,
            ],
            build
        )

    }

    name = "fast laser sentinel"
    cost = 50
    reload = 1*60*60

    config = {
        "objectClass": DroneSentinel,
        "AI": ["missileV1", "escortAlly","useActivates"],
        "coreType":"default",
        "activates": {
            "weapon": ["fast laser"]
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0,
        "creatorSpecialAttention": 0.0000001
    }

}