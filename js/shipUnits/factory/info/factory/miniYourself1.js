import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { DroneV2 } from "../../../../object/complex/droneV2.js"
import { FactoryController } from "../../factoryController.js"
import { FactoryExtend } from "../extend/factory.js"

export class MiniYourself1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FactoryExtend,
            ],
            build
        )

    }

    name = "mini yourself 1"
    cost = 100
    reload = 1*60*60

    func = new FactoryController().yourselfFactory

    config = {
        "statsMult": -0.8
    }

}