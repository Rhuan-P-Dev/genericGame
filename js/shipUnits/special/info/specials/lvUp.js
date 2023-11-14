
import { BasicActivate } from "../../../forAllShipUnits/basicActivate.js"
import { SpecialController } from "../../specialController.js"

var Special = ""

onInit(function(){

    Special = new SpecialController()

})

export class LvUp extends BasicActivate {

    name = "LvUp"
    cost = 50
    type = "special"
    func = Special.lvUp
    reload = 10*60

    config = {
        "mult": 0.1
    }

}