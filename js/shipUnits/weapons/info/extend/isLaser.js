
import { InheritController } from "../../../../generalUtils/inherit.js"
import { CommonImport } from "../../../../object/common/commonImport.js"

export class IsLaser {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                CommonImport
            ],
            build
        )

    }

    isLaser = true

}