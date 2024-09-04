
import { InheritController } from "../../../../generalUtils/inherit.js"
import { SpecialController } from "../../specialController.js"
import { LVUpAnimation } from "../animations/lvUpAnimation.js"
import { SpecialExtend } from "../extend/special.js"

export class LvUp {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SpecialExtend,
                LVUpAnimation
            ],
            build
        )

    }

    subType = ["longTermBenefit"]

    name = "lv up"
    cost = 50
    func = new SpecialController().lvUp
    reload = 10*60

    config = {
        "statsMult": 0.1
    }

}