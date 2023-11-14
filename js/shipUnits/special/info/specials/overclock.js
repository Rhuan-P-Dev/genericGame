import { BasicActivate } from "../../../forAllShipUnits/basicActivate.js"
import { SpecialController } from "../../specialController.js"

var Special = ""

onInit(function(){

    Special = new SpecialController()

})

export class Overclock extends BasicActivate {

    name = "Overclock"
    cost = 0
    type = "special"
    func = Special.overclock
    reload = 10

    config = {
        "overclockMult": 0.1,
        "overclockDiv": 2,
    }

}