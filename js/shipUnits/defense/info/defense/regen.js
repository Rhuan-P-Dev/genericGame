import { BasicActivate } from "../../../forAllShipUnits/basicActivate.js"
import { DefenseController } from "../../defenseController.js"

var Defense = ""

onInit(function(){

    Defense = new DefenseController()

})

export class Regen extends BasicActivate {

    name = "Regen"
    cost = 20
    type = "defense"
    func = Defense.regen
    reload = 60

    config = {
        "lifeRegenBuff": 0.17,
        "energyRegenDebuff": 0.08,
    }

}