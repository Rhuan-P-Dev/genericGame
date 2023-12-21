import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { StationaryObject } from "../../../../object/complex/stationaryObject.js"
import { FactoryController } from "../../factoryController.js"
import { FactoryExtend } from "../extend/factory.js"

export class StationaryBasicAntiProjectileSystem {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend,
            ],
            build
        )

    }

    name = "stationary basic anti-projectile system"
    cost = 50
    reload = 5*60

    currentVelMult = 0

    config = {
        "objectClass": StationaryObject,
        "AI": ["useActivates"],
        "activates": {
            "defense": ["basic anti-projectile system"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0,

        "lifeTime": 20*60,
        
    }

}