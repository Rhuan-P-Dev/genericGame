import { InheritController } from "../../../../generalUtils/inherit.js"
import { Barrier } from "./barrier.js"

export class ShadowBarrier {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                Barrier,
            ],
            build
        )

        this.name = "shadow barrier"
        this.costMult = 1.5

        this.stats.statsMult = -0.90
        this.quantity = 10


    }

}