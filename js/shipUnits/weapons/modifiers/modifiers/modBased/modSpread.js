import { WeaponsModifiersController } from "../../weaponsModifiersController.js"
import { Mod } from "./mod.js"

export class ModSpread extends Mod {

    spread = undefined

    constructor(
        spread = 0.1,
    ){

        super()

        this.name = "spread"
        this.spread = spread
        this.func = new WeaponsModifiersController().spread

    }

}