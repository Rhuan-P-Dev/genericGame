import { TopDownBehavior } from "../../../../AI/behavior/topDownBehavior.js"
import { BaseObjectFactory } from "../../../../object/factory.js"
import { BasicActivate } from "../../../forAllShipUnits/basicActivate.js"
import { FactoryController } from "../../factoryController.js"

var Factory = ""

onInit(function(){

    Factory = new FactoryController()

})

export class DF1 extends BasicActivate {

    name = "DF1"
    cost = 1
    type = "factory"
    func = Factory.createFactoryObject
    reload = 10
    reloadTemp = 0
    reloadStep = 1

    config = {
        "objectClass": BaseObjectFactory,
        "AI": ["turret"],
        "apply": {
            "factory": ["MSP1"],
        },
        "behavior": new TopDownBehavior().searchPriority
    }

}