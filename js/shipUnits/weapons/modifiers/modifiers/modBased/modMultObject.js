import { InheritController } from "../../../../../generalUtils/inherit.js"
import { Mod } from "./mod.js"

export class ModMultObject {

    quantity = 10

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Mod
            ],
            build
        )

    }

}