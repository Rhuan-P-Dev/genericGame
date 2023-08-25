import { InheritController } from "../../../../generalUtils/inherit.js"
import { WeaponsModifiersController } from "../weaponsModifiersController.js"
import { ModCumulative } from "./modBased/modCumulative.js"
import { ModStats } from "./modBased/modStats.js"

export class Growing {

    constructor(){
        
        new InheritController().inherit(
            this,
            [
                ModCumulative,
                ModStats
            ]
        )

        this.name = "growing"
        this.costMult = 5
        this.func = new WeaponsModifiersController().cumulative
        this.value = 0
        this.valueBase = 0
        this.valueStep = 0.1

    }

}