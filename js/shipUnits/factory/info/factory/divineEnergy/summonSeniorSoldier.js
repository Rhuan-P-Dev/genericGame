import { FocusedTopDownBehavior } from "../../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { Soldier } from "../../../../../object/complex/special ship/soldier.js"
import { FactoryExtend } from "../../extend/factory.js"

export class SummonSeniorSoldier {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend,
            ],
            build
        )

    }

    name = "summon senior soldier"
    cost = 40
    reload = 1*60

    // wrong
    consumableStat = "divineEnergy"

    config = {
        "objectClass": Soldier,
        "AI": ["movable","useActivates","escortAlly","areaSupport","directionalDefense","dodge"],
        "coreType":"default",
        "activates": {
            "weapon": ["electrified missile 1","flame thrower 1","random"],
            "defense": ["heal pulse 1", "random"]
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0.25,
        "creatorSpecialAttention": 0.0000001
    }

}