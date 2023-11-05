import { InheritController } from "../../../../../generalUtils/inherit.js"
import { CommonImport } from "../../../../../object/common/commonImport.js"

export class Mod{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                CommonImport
            ],
            build
        )

    }

    ID = undefined

    name = undefined

    costMult = undefined

    func = undefined

}