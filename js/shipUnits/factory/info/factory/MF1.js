import { TopDownBehavior } from "../../../../AI/behavior/topDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { DroneV2 } from "../../../../object/complex/droneV2.js"
import { FactoryExtend } from "../extend/factory.js"

export class MF1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend
            ],
            build
        )

    }

    name = "MF1"
    cost = 50
    reload = 7*60

    currentVelMult = 0

    config = {
        "objectClass": DroneV2,
        "AI": ["movable","useActivates"],
        "apply": {
            "weapon": ["ML1"],
        },
        "behavior": new TopDownBehavior().searchPriority
    }

}