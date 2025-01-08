import { InheritController } from "../../../../generalUtils/inherit.js"
import { HealPulse1 } from "./healPulse1.js"

export class HealPulse2 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                HealPulse1
            ],
            build
        )

        this.cost *= 1.25
        this.config.heal *= 1.5
        this.config.range *= 1.35

    }
    name = "heal pulse 2"

}