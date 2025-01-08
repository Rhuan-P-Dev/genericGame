import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Ship } from "../../../../object/complex/ship.js"
import { FactoryExtend } from "../extend/factory.js"

export class FactoryShip {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend,
            ],
            build
        )

    }

    name = "factory ship"
    cost = 500
    reload = 20*60

    config = {
        "objectClass": Ship,
        "AI": ["movable","useActivates","escortAlly","areaSupport","directionalDefense","dodge"],
        "coreType":"default",
        "activates": {
            "weapon": ["random","random","random","random"],
            "defense": ["random","random","random"],
            "factory": ["random"],
            "special": ["random","random"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0,
    }

}