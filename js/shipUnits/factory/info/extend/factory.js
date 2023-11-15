import { InheritController } from "../../../../generalUtils/inherit.js"
import { BasicActivate } from "../../../forAllShipUnits/basicActivate.js"
import { FactoryController } from "../../factoryController.js"

export class FactoryExtend {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicActivate
            ],
            build
        )

    }

    type = "factory"
    func = new FactoryController().createObject

}