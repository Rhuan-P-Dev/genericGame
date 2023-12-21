import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { DroneV2 } from "../../../../object/complex/droneV2.js"
import { FactoryExtend } from "../extend/factory.js"

export class MovableShotgun1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend
            ],
            build
        )

    }

    name = "movable shotgun 1"
    cost = 40
    reload = 6*60

    currentVelMult = 0

    config = {
        "objectClass": DroneV2,
        "AI": ["missileV1","useActivates"],
        "activates": {
            "weapon": ["shotgun 1"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0
    }

}