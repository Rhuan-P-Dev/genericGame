import { InheritController } from "../../../../generalUtils/inherit.js"
import { WeaponsModifiersController } from "../weaponsModifiersController.js"
import { ModCumulative } from "./modBased/modCumulative.js"

export class Machinegun {

    constructor(){
        
        new InheritController().inherit(
            this,
            [
                ModCumulative
            ]
        )

        this.name = "machinegun"
        this.costMult = 1.05
        this.callBackFunction = undefined
        this.func = new WeaponsModifiersController().machinegun
        this.value = 1
        this.valueBase = 1
        this.valueStep = 0.1

    }

}