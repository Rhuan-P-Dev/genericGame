
import { InheritController } from "../../../../generalUtils/inherit.js"
import { SpecialController } from "../../specialController.js"
import { TeleportAnimation } from "../animations/teleportAnimation.js"
import { SpecialExtend } from "../extend/special.js"

export class Teleport {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SpecialExtend,
                TeleportAnimation
            ],
            build
        )

    }

    subType = ["movement"]

    name = "teleport"
    cost = 100
    func = new SpecialController().teleport
    reload = 10*60

    config = {
        "distance": 300
    }

}