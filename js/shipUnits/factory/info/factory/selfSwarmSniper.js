import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { SelfSwarmDrone } from "../../../../object/complex/special drone/selfSwarmDrone.js"
import { FactoryExtend } from "../extend/factory.js"

export class SelfSwarmSniper {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend,
            ],
            build
        )

    }

    name = "self swarm sniper"
    cost = 80
    reload = 20*60

    config = {
        "objectClass": SelfSwarmDrone,
        "AI": ["movable","useActivates"],
        "activates": {
            "weapon": ["self swarm three sniper"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0.3,
    }

}