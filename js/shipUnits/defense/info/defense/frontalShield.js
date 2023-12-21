
import { InheritController } from "../../../../generalUtils/inherit.js"
import { DefenseController } from "../../defenseController.js"
import { DefenseExtend } from "../extend/defense.js"

export class FrontalShield {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend
            ],
            build
        )

    }

    name = "frontal shield"
    cost = 150
    func = new DefenseController().directionalShield
    reload = 130

    config = {

        angle: 180

    }

}