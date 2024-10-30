import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Turret } from "../../../../object/complex/turrent.js"
import { FactoryExtend } from "../extend/factory.js"

export class Diffuser {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend
            ],
            build
        )

    }

    name = "diffuser"
    cost = 80
    reload = 30*60

    currentVelMult = 0

    config = {
        "objectClass": Turret,
        "AI": ["rotableTurret","useActivates"],
        "activates": {
            "weapon": ["diffusion 1"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0.5
    }

}