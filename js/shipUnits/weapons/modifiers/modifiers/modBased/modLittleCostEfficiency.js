import { InheritController } from "../../../../../generalUtils/inherit.js"
import { Mod } from "./mod.js"

export class ModLittleCostEfficiency {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Mod
            ],
            build
        )

    }

    costMult = 0.99

    func = (output, modifier, config, node) => {return output}

}