
import { InheritController } from "../../../../generalUtils/inherit.js"
import { DefenseController } from "../../defenseController.js"
import { DefenseExtend } from "../extend/defense.js"

export class ReflectShield1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend
            ],
            build
        )

    }

    subType = ["directionalDefense"]

    name = "reflect shield 1"
    cost = 20
    func = new DefenseController().reflectShield
    reload = 0.25*60

    config = {

        "angle": 15,
        "angleDistortion": 0,

        "range": 100,

    }

}