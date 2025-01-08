import { InheritController } from "../../../../../generalUtils/inherit.js"
import { SpecialController } from "../../../specialController.js"
import { SpecialExtend } from "../../extend/special.js"

export class MinorPerfectAreaClone {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SpecialExtend
            ],
            build
        )

    }

    name = "minor perfect area clone"
    cost = 100
    func = new SpecialController().cloneInArea
    reload = 1*60

    // wrong
    consumableStat = "divineEnergy"

    config = {
        "statsMult": 0,
        "range": 200,
        "color": "yellow",
        "dispersion": 50
    }

}