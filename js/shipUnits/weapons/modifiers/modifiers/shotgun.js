import { InheritController } from "../../../../generalUtils/inherit.js"
import { WeaponsModifiersController } from "../weaponsModifiersController.js"
import { ModDistortion } from "./modBased/modDistortion.js"
import { ModMultObject } from "./modBased/modMultObject.js"
import { ModSpread } from "./modBased/modSpread.js"
import { ModStats } from "./modBased/modStats.js"

export class Shotgun {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                ModSpread,
                ModMultObject,
                ModStats,
                ModDistortion
            ],
            build
        )

        this.name = "shotgun"
        this.costMult = 3
        this.func = new WeaponsModifiersController().shotgun
        this.quantity = 10
        this.spread = 0.3

        this.stats.statsMult = 0.3

    }

}