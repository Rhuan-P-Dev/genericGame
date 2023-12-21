import { InheritController } from "../../../../generalUtils/inherit.js"
import { DefenseController } from "../../defenseController.js"
import { DefenseExtend } from "../extend/defense.js"

export class BasicAntiProjectileSystem {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend
            ],
            build
        )

    }

    name = "basic anti-projectile system"
    cost = 0
    func = new DefenseController().antiProjectileSystem
    reload = 1

    config = {

        "range": 125,
        "damage": 6,
        "maxObjects": 2,

        "hitReload": 40,
        "hitEnergyConsume": 20,

        "color": "black",
        "lineWidth": 1,

        "drawLine": true,
        
    }

}