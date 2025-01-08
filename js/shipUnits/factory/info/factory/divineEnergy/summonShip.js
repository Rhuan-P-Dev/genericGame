import { FocusedTopDownBehavior } from "../../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { Ship } from "../../../../../object/complex/ship.js"
import { FactoryExtend } from "../../extend/factory.js"

export class SummonShip {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend,
            ],
            build
        )

    }

    name = "summon ship"
    cost = 20
    reload = 1*60

    // wrong
    consumableStat = "divineEnergy"

    config = {
        "objectClass": Ship,
        "AI": ["movable","useActivates","escortAlly","areaSupport","directionalDefense"],
        "coreType":"default",
        "activates": {
            "weapon": ["random","random"],
            "defense": ["random"]
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0.125,
        "creatorSpecialAttention": 0.0000001
    }

}