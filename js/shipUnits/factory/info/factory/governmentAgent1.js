import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { GovernmentDrone } from "../../../../object/complex/special drone/governmentDrone.js"
import { FactoryExtend } from "../extend/factory.js"

export class GovernmentAgent1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend,
            ],
            build
        )

    }

    name = "government agent 1"
    cost = 50
    reload = 30*60

    config = {
        "objectClass": GovernmentDrone,
        "AI": ["movable","useActivates","escortAlly","areaSupport","directionalDefense","dodge"],
        "coreType":"default",
        "activates": {
            "weapon": ["random","random"],
            "defense": ["random"]
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0,
        "creatorSpecialAttention": 0.0000001
    }

}