
import { InheritController } from "../../../../generalUtils/inherit.js"
import { SpecialController } from "../../specialController.js"
import { SavePointAnimation } from "../animations/savePointAnimation.js"
import { SpecialExtend } from "../extend/special.js"

export class ActionSave {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SpecialExtend,
                SavePointAnimation,
            ],
            build
        )

    }

    subType = ["longTermBenefit","midTermBenefit","lifeGuard","shortTermBenefit"]

    // wrong
    consumableStat = "actionPoints"

    name = "action save"
    cost = 5
    func = new SpecialController().savePoint
    reload = 10*60

}