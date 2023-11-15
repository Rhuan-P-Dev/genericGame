
import { InheritController } from "../../../../generalUtils/inherit.js"
import { BasicActivate } from "../../../forAllShipUnits/basicActivate.js"

export class DefenseExtend{


    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicActivate
            ],
            build
        )

    }

    type = "defense"

}