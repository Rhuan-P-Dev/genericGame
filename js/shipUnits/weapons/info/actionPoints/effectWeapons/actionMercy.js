
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { ActionMercyEffect } from "../../effects/actionMercytEffect.js"
import { ActionPointsWeapon } from "../../extend/actionPointsWeapon.js"

export class ActionMercy {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                ActionMercyEffect,
                ActionPointsWeapon
            ],
            build
        )

        this.name = "action mercy"

        this.cost = 1
        this.reload = 50
        this.distance = 150
        this.range = 150

    }

}