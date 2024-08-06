
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

        this.priority += 1

        this.graphicID = "generic turret"

        this.rotationVel *= 3

    }

}