import { InheritController } from "../../../../generalUtils/inherit.js"
import { BasicActivate } from "../../../forAllShipUnits/basicActivate.js"
import { DefenseController } from "../../defenseController.js"
import { DefenseExtend } from "../extend/defense.js"

export class Regen {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend
            ],
            build
        )

    }

    name = "regen"
    cost = 20
    func = new DefenseController().regen
    reload = 60

    config = {
        "lifeRegenBuff": 0.17,
        "energyRegenDebuff": 0.08,
    }

}