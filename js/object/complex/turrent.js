
import { FocusedTopDownBehavior } from "../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { Rotable } from "../basic/rotable.js"
import { StationaryObject } from "./stationaryObject.js"

export class Turret {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                StationaryObject,
                Rotable,
                FocusedTopDownBehavior,
            ],
            build
        )

        this.graphicID = "generic turret - P1"

        this.rotationVel *= 3

    }

}