import { TopDownBehavior } from "../../../../AI/behavior/topDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { BaseObjectFactory } from "../../../../object/complex/factory.js"
import { FactoryExtend } from "../extend/factory.js"

export class DF1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend
            ],
            build
        )

    }

    name = "DF1"
    cost = 200
    reload = 20*60

    currentVelMult = 0

    config = {
        "objectClass": BaseObjectFactory,
        "AI": ["useActivates"],
        "apply": {
            "factory": ["MSP1"],
        },
        "behavior": new TopDownBehavior().searchPriority
    }

}