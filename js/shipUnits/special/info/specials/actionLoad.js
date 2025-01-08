
import { InheritController } from "../../../../generalUtils/inherit.js"
import { SpecialController } from "../../specialController.js"
import { SpecialExtend } from "../extend/special.js"

export class ActionLoad {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SpecialExtend,
            ],
            build
        )

    }

    subType = ["suicide"]

    name = "action load"
    cost = 0
    func = new SpecialController().selfDelete
    reload = 1*60

}