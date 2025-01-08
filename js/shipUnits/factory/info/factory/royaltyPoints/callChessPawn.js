import { FocusedTopDownBehavior } from "../../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { ChessPawn } from "../../../../../object/complex/special drone/chessPawn.js"
import { FactoryExtend } from "../../extend/factory.js"

export class CallChessPawn {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend,
            ],
            build
        )

    }

    consumableStat = "royaltyPoints"

    name = "call chess pawn"
    cost = 1
    reload = 30

    config = {
        "objectClass": ChessPawn,
        "AI": ["movable","useActivates","escortAlly","areaSupport"],
        "coreType":"support",
        "activates": {},
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0,
        "creatorSpecialAttention": 0.0000001,
    }

}