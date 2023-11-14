import { TopDownBehavior } from "../../../../AI/behavior/topDownBehavior.js"
import { BaseObjectFactory } from "../../../../object/complex/factory.js"
import { BasicActivate } from "../../../forAllShipUnits/basicActivate.js"
import { FactoryController } from "../../factoryController.js"

var Factory = ""

onInit(function(){

    Factory = new FactoryController()

})

export class DF1 extends BasicActivate {

    name = "DF1"
    cost = 200
    type = "factory"
    func = Factory.createObject
    reload = 20*60

    config = {
        "objectClass": BaseObjectFactory,
        "AI": ["useActivates"],
        "apply": {
            "factory": ["MSP1"],
        },
        "behavior": new TopDownBehavior().searchPriority
    }

}