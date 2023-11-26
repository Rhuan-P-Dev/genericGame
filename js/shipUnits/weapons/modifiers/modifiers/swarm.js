import { InheritController } from "../../../../generalUtils/inherit.js"
import { Clone } from "./clone.js"

export class Swarm {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                Clone,
            ],
            build
        )

        this.name = "swarm"
        this.costMult = 3

        this.stats.statsMult = -0.50
        this.quantity = 10

        this.addOriginalObject = false

    }

}