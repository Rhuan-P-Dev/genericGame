import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { DroneV2 } from "../../../../object/complex/droneV2.js"
import { FactoryExtend } from "../extend/factory.js"

export class Assassin1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend,
            ],
            build
        )

    }

    name = "assassin 1"
    cost = 70
    reload = 15*60

    config = {
        "objectClass": DroneV2,
        "AI": ["missileV1","useActivates"],
        "activates": {
            "weapon": ["shotgun 1"],
            "special": ["turbo 1","basic camouflage","basic camouflage"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0,
    }

}