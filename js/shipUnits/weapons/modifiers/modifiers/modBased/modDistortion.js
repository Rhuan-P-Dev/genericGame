import { InheritController } from "../../../../../generalUtils/inherit.js"
import { WeaponsModifiersController } from "../../weaponsModifiersController.js"
import { Mod } from "./mod.js"

export class ModDistortion {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Mod
            ],
            build
        )

    }

    name = "distortion"

    distortion = 0.1

    costMult = 1

    func = new WeaponsModifiersController().distortion

}