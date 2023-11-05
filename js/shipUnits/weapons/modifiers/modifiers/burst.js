import { InheritController } from "../../../../generalUtils/inherit.js"
import { WeaponsModifiersController } from "../weaponsModifiersController.js"
import { ModInterval } from "./modBased/modInterval.js"
import { ModMultObject } from "./modBased/modMultObject.js"
import { ModSpread } from "./modBased/modSpread.js"
import { ModStats } from "./modBased/modStats.js"

export class Burst {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                ModSpread,
                ModMultObject,
                ModInterval,
                ModStats
            ],
            build
        )

        this.name = "burst"
        this.costMult = 3
        this.func = new WeaponsModifiersController().burst
        this.quantity = 3
        this.spread = 0.05
        this.interval = 8

    }

}