import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Turret } from "../../../../object/complex/turrent.js"
import { FactoryExtend } from "../extend/factory.js"

export class SP1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend
            ],
            build
        )

    }

    name = "SP1"
    cost = 20
    reload = 4*60


    config = {
        "objectClass": Turret,
        "AI": ["rotableTurret","useActivates"],
        "apply": {
            "weapon": ["P1"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority
    }

}