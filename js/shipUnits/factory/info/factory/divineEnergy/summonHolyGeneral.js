import { FocusedTopDownBehavior } from "../../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { HolyGeneral } from "../../../../../object/complex/special ship/holyGeneral.js"
import { FactoryExtend } from "../../extend/factory.js"

export class SummonHolyGeneral {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend,
            ],
            build
        )

    }

    name = "summon holy general"
    cost = 100
    reload = 1*60

    // wrong
    consumableStat = "divineEnergy"

    config = {
        "objectClass": HolyGeneral,
        "AI": ["movable","useActivates","escortAlly","areaSupport","directionalDefense","dodge"],
        "coreType":"support",
        "activates": {},
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0,
        "creatorSpecialAttention": 0.0000001
    }

}