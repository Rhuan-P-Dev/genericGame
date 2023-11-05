import { InheritController } from "../../../../../generalUtils/inherit.js"
import { Mod } from "./mod.js"

export class ModInterval {

    interval = 150

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