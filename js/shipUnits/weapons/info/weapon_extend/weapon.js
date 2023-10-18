
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Rotable } from "../../../../object/basic/rotable.js"
import { BasicActivate } from "../../../forAllShipUnits/basicActivate.js"

export class Weapon{


    constructor(){

        new InheritController().inherit(
            this,
            [
                Rotable,
                BasicActivate
            ]
        )

    }

    type = "weapon"

    xOffset = 0//randomInteger(-200,200)
    yOffset = 0//randomInteger(-200,200)


    buildAngle = 0

    range = 180

    hasModifier = false

    config = {
        multVel: 3,
        damageMult: 1,
    }
    lifeTime = 60
    baseFunc = undefined

    calcStats(){

        this.range = this.lifeTime * this.config.multVel

    }

}