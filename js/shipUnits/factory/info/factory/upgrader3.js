import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { DroneV2 } from "../../../../object/complex/droneV2.js"
import { FactoryExtend } from "../extend/factory.js"

export class Upgrader3 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend
            ],
            build
        )

    }

    name = "upgrader 3"
    cost = 110
    reload = 40*60

    currentVelMult = 0

    config = {
        "objectClass": DroneV2,
        "AI": ["movable","useActivates"],
        "activates": {
            "special": ["lv up"],
            "weapon": ["piston 1","small bullet cluster 1","sniper piston 1"],
            "defense": [
                "survive instinct 1",
                "little shield boost",
                "tactic upgrade 1",
                "resilience 1",
                "light defense",
                "efficient shield",
                "regen",
            ]
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0
    }

}