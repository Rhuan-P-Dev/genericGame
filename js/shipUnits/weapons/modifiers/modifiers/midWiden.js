import { InheritController } from "../../../../generalUtils/inherit.js"
import { Widen } from "./widen.js"

export class MidWiden {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Widen
            ],
            build
        )

        this.name = "mid widen"

        this.spread *= 0.5

        this.costMult = 1.025

    }

}