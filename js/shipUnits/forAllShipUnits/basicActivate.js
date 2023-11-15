import { InheritController } from "../../generalUtils/inherit.js"
import { CommonImport } from "../../object/common/commonImport.js"

export class BasicActivate {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                CommonImport // for compatibility
            ],
            build
        )

    }

    name = undefined
    cost = 10
    type = "???"
    func = undefined
    reload = 60
    reloadTemp = 0
    reloadStep = 1

    currentVelMult = 1 // Mmmm....

    config = undefined

}