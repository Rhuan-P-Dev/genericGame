
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { ActionFightEffect } from "../../effects/actionFightEffect.js"
import { ActionPointsWeapon } from "../../extend/actionPointsWeapon.js"

export class ActionFight {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                ActionFightEffect,
                ActionPointsWeapon
            ],
            build
        )

        this.name = "action fight"

        this.cost = 1
        this.reload = 25
        this.distance = 150
        this.range = 150

    }

}