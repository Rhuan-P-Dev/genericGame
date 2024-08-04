
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { BlessedSpecialEffect } from "../../effects/blessedSpecialEffect.js"
import { DarkEnergyEffectWeapon } from "../../extend/darkEnergyEffectWeapon.js"

export class BlessedSpecial {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                BlessedSpecialEffect,
                DarkEnergyEffectWeapon
            ],
            build
        )

        this.name = "blessed special"

        this.cost = 180
        this.reload = 45*60
        this.distance = 0
        this.range = 120

    }

}