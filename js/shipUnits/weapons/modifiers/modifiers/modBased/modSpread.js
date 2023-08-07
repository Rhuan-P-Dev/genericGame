import { WeaponsModifiersController } from "../../weaponsModifiersController.js"
import { Mod } from "./mod.js"

export class ModSpread extends Mod {

    spread = undefined

    constructor(){

        super()

    }

    name = "spread"

    spread = 0.1

    costMult = 1.01

    func = new WeaponsModifiersController().spread

}