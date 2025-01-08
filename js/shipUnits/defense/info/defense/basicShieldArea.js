import { InheritController } from "../../../../generalUtils/inherit.js"
import { DefenseController } from "../../defenseController.js"
import { DefenseExtend } from "../extend/defense.js"

export class BasicShieldArea {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend
            ],
            build
        )

    }

    subType = ["areaSupport"]

    name = "basic shield area"
    cost = 0
    func = new DefenseController().antiProjectileSystem
    reload = 1

    config = {

        "range": 150,
        "damage": 0.25,

        "hitEnergyConsume": 1,

        "color": "black",
        "lineWidth": 1,

        "drawArea": true,
        
    }

}