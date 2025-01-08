import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { DroneV2 } from "../../../../object/complex/droneV2.js"
import { FactoryExtend } from "../extend/factory.js"

export class Tank1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend
            ],
            build
        )

    }

    name = "tank 1"
    cost = 40
    reload = 24*60

    currentVelMult = 0

    config = {
        "objectClass": DroneV2,
        "AI": ["movable","useActivates"],
        "coreType":"default",
        "activates": {
            "special": ["basic taunt"],
            "defense": ["light defense","regen"],
            
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0
    }

}