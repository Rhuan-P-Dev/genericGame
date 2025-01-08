import { InheritController } from "../../../../../generalUtils/inherit.js"
import { WeaponsModifiersController } from "../../weaponsModifiersController.js"
import { Mod } from "./mod.js"

export class ModLittleBoost {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Mod
            ],
            build
        )

    }

    name = "undefined"
    stat = "undefined"
    costMult = 1.05
    mult = 1.07

    func = new WeaponsModifiersController().booster

}