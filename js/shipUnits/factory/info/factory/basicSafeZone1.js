import { TopDownBehavior } from "../../../../AI/behavior/topDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { ObjectFactory } from "../../../../object/complex/factory.js"
import { FactoryExtend } from "../extend/factory.js"

export class BasicSafeZone1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend
            ],
            build
        )

    }

    name = "basic safe zone 1"
    cost = 200
    reload = 30*60

    currentVelMult = 0

    config = {
        "objectClass": ObjectFactory,
        "AI": ["useActivates"],
        "activates": {
            "factory": ["movable safer perimeter 1","safer perimeter 1","mine seeder 1"],
        },
        "behavior": new TopDownBehavior().searchPriority,
        "statsMult": 0
    }

}