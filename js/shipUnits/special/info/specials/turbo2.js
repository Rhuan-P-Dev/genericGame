import { InheritController } from "../../../../generalUtils/inherit.js"
import { Turbo1 } from "./turbo1.js"

export class Turbo2 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Turbo1
            ],
            build
        )

        this.cost *= 1.2
        this.reload *= 1.25

        this.config.stats.vel *= 1.25
        this.config.timer *= 1.05

    }

    name = "turbo 2"

}