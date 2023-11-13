import { InheritController } from "../../../../generalUtils/inherit.js"
import { WeaponsModifiersController } from "../weaponsModifiersController.js"
import { ModMultObject } from "./modBased/modMultObject.js"
import { ModStats } from "./modBased/modStats.js"

export class Clone {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                ModMultObject,
                ModStats,
            ],
            build
        )

        this.name = "clone"
        this.costMult = 2
        this.func = new WeaponsModifiersController().replicator

        this.stats.mult = 0
        this.quantity = 1

        this.addOriginalObject = true


    }

}