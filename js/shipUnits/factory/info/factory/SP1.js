import { Turret } from "../../../../object/turrent.js"
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
    func = Factory.createFactoryObject
    reload = 120
    reloadTemp = 0
    reloadStep = 1

    config = {
        "objectClass": Turret,
        "AI": ["turret"],
        "apply": {
            "weapon": ["auto_P1"],
        },
    }

}