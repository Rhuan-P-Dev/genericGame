import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { StationaryObject } from "../../../../object/complex/stationaryObject.js"
import { FactoryController } from "../../factoryController.js"
import { FactoryExtend } from "../extend/factory.js"

export class StationarBasicShieldArea {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend,
            ],
            build
        )

    }

    name = "stationary basic shield area"
    cost = 60
    reload = 15*60

    currentVelMult = 0

    config = {
        "objectClass": StationaryObject,
        "AI": ["useActivates","areaSupport"],
        "coreType":"factory",
        "activates": {
            "defense": ["basic shield area"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0,

        "lifeTime": 30*60,
        
    }

}