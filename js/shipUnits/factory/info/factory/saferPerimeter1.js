import { FocusedNearBehavior } from "../../../../AI/behavior/focusedNearBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Turret } from "../../../../object/complex/turrent.js"
import { FactoryExtend } from "../extend/factory.js"

export class SaferPerimeter1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend
            ],
            build
        )

    }

    name = "safer perimeter 1"
    cost = 20
    reload = 10*60

    currentVelMult = 0

    config = {
        "objectClass": Turret,
        "AI": ["rotableTurret","useActivates"],
        "activates": {
            "weapon": ["piston 1"],
        },
        "behavior": new FocusedNearBehavior().searchPriority,
        "statsMult": 0
    }

}