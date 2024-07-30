
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Rotable } from "../../../../object/basic/rotable.js"
import { BasicActivate } from "../../../forAllShipUnits/basicActivate.js"

export class BasicWeaponExtend{


    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Rotable,
                BasicActivate
            ],
            build
        )

    }

    type = "weapon"

    xOffset = 0//randomInteger(-200,200)
    yOffset = 0//randomInteger(-200,200)

    buildAngle = 0

    range = 0

    config = {}

    func = () => {}

}