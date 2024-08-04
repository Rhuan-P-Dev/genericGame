
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { BlessedBlueEffect } from "../../effects/blessedBlueEffect.js"
import { DarkEnergyEffectWeapon } from "../../extend/darkEnergyEffectWeapon.js"

export class BlessedBlue {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                BlessedBlueEffect,
                DarkEnergyEffectWeapon
            ],
            build
        )

        this.name = "blessed blue"

        this.cost = 1
        this.reload = 2
        this.distance = 200
        this.range = 200

    }

}