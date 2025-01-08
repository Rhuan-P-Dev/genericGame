
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { MinorJudgmentEffect } from "../../effects/minorJudgmentEffect.js"
import { DivineEnergyEffectWeapon } from "../../extend/divineEnergyEffectWeapon.js"

export class MinorJudgment {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                MinorJudgmentEffect,
                DivineEnergyEffectWeapon
            ],
            build
        )

        this.name = "minor judgment"

        this.cost = 25
        this.reload = 10*60
        this.distance = 200
        this.range = 200

    }

}