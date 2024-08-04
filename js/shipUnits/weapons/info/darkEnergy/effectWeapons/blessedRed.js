
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { BlessedRedEffect } from "../../effects/blessedRedEffect.js"
import { DarkEnergyEffectWeapon } from "../../extend/darkEnergyEffectWeapon.js"

export class BlessedRed {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                BlessedRedEffect,
                DarkEnergyEffectWeapon
            ],
            build
        )

        this.name = "blessed red"

        this.cost = 70
        this.reload = 12*60
        this.distance = 0
        this.range = 150

    }

}