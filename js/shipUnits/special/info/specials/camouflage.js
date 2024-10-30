import { InheritController } from "../../../../generalUtils/inherit.js"
import { BasicCamouflage } from "./basicCamouflage.js"

export class Camouflage {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicCamouflage
            ],
            build
        )

    }

    name = "camouflage"
    cost = 60

    config = {

        stats: {
            "priority": -4,
        },

        timer: 15*60

    }

}