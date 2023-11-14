
import { BasicActivate } from "../../../forAllShipUnits/basicActivate.js"
import { SpecialController } from "../../specialController.js"

var Special = ""

onInit(function(){

    Special = new SpecialController()

})

export class WeakClone extends BasicActivate {

    name = "WeakClone"
    cost = 50
    type = "special"
    func = Special.weakClone
    reload = 1*60

    config = {
        "mult": -0.5
    }

}