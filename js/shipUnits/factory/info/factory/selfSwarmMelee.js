import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { SelfSwarmDrone } from "../../../../object/complex/special drone/selfSwarmDrone.js"
import { FactoryExtend } from "../extend/factory.js"

export class SelfSwarmMelee {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend,
            ],
            build
        )

    }

    name = "self swarm melee"
    cost = 50
    reload = 15*60

    config = {
        "objectClass": SelfSwarmDrone,
        "AI": ["missileV1", "escortAlly"],
        "coreType":"default",
        "activates": {},
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0.5,
        "creatorSpecialAttention": 0.0000001
    }

}