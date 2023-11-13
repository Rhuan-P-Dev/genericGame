import { InheritController } from "../../../../generalUtils/inherit.js"
import { Clone } from "./clone.js"

export class Barrier {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                Clone,
            ],
            build
        )

        this.name = "barrier"
        this.costMult = 1.5

        this.stats.mult = -0.50
        this.quantity = 4

    }

}