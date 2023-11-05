import { InheritController } from "../../../../../generalUtils/inherit.js"
import { Mod } from "./mod.js"

export class ModCumulative{

    value = 0
    valueStep = 0.1
    valueBase = 0
    callBackFunction = undefined

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