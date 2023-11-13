import { InheritController } from "../../../../generalUtils/inherit.js"
import { ModSpread } from "./modBased/modSpread.js"

export class Widen {

    spread = undefined

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                ModSpread
            ],
            build
        )

    }

    name = "widen"

    spread = 0.6

    costMult = 1.05

}