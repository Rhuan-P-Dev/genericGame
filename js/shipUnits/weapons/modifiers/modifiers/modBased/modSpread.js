import { InheritController } from "../../../../../generalUtils/inherit.js"
import { WeaponsModifiersController } from "../../weaponsModifiersController.js"
import { Mod } from "./mod.js"

export class ModSpread {

    spread = undefined

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Mod
            ],
            build
        )

    }

    name = "spread"

    spread = 0.1

    costMult = 1.01

    func = new WeaponsModifiersController().spread

}