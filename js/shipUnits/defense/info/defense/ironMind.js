import { InheritController } from "../../../../generalUtils/inherit.js"
import { DefenseController } from "../../defenseController.js"
import { DefenseExtend } from "../extend/defense.js"

export class IronMind {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DefenseExtend
            ],
            build
        )

    }

    name = "iron mind"
    cost = 20
    func = new DefenseController().psychologicalDefense
    reload = 30*60

    config = {

        defense: 8,
        decay: 0.25,

        timer: 15*60

    }

}