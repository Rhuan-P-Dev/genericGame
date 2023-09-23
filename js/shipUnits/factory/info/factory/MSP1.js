import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { Drone } from "../../../../object/drone.js"
import { BasicActivate } from "../../../forAllShipUnits/basicActivate.js"
import { FactoryController } from "../../factoryController.js"

var Factory = ""

onInit(function(){

    Factory = new FactoryController()

})

export class MSP1 extends BasicActivate {

    name = "MSP1"
    cost = 20
    type = "factory"
    func = Factory.createObject
    reload = 60
    reloadTemp = 0
    reloadStep = 1

    config = {
        "objectClass": Drone,
        "AI": ["movable","useActivates"],
        "apply": {
            "weapon": ["P1"],
            "factory": ["SP1"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority
    }

}