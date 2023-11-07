import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { Turret } from "../../../../object/complex/turrent.js"
import { BasicActivate } from "../../../forAllShipUnits/basicActivate.js"
import { FactoryController } from "../../factoryController.js"

var Factory = ""

onInit(function(){

    Factory = new FactoryController()

})

export class SP1 extends BasicActivate {

    name = "SP1"
    cost = 20
    type = "factory"
    func = Factory.createObject
    reload = 240
    reloadTemp = 0
    reloadStep = 1

    config = {
        "objectClass": Turret,
        "AI": ["rotableTurret","useActivates"],
        "apply": {
            "weapon": ["P1"],
        },
        "behavior": new FocusedTopDownBehavior().searchPriority
    }

}