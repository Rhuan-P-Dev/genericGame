import { InheritController } from "../../../../../generalUtils/inherit.js"
import { WeaponsModifiersController } from "../../weaponsModifiersController.js"
import { Mod } from "./mod.js"

export class ModDice {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                Mod
            ],
            build
        )

        this.name = "dice"
        this.costMult = 0.99
        this.func = new WeaponsModifiersController().attributeRandomizer

        this.fluctuation = 0.05


    }

}