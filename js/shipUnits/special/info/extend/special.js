import { InheritController } from "../../../../generalUtils/inherit.js"
import { BasicActivate } from "../../../forAllShipUnits/basicActivate.js"

export class SpecialExtend {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicActivate
            ],
            build
        )

    }

    type = "special"
    config = {}

}