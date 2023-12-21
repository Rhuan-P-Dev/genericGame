import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Drone } from "../../../../object/complex/drone.js"
import { FactoryExtend } from "../extend/factory.js"

export class Upgrader2 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend
            ],
            build
        )

    }

    name = "upgrader 2"
    cost = 80
    reload = 30*60

    currentVelMult = 0

    config = {
        "objectClass": Drone,
        "AI": ["movable","useActivates"],
        "activates": {
            "special": ["lv up","lv up"],
            "weapon": ["piston 1","small bullet cluster 1","sniper piston 1"],
            "defense": ["survive instinct 1","light defense","regen"]
        },
        "behavior": new FocusedTopDownBehavior().searchPriority,
        "statsMult": 0
    }

}