
import { FocusedTopDownBehavior } from "../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { EnergizedObject } from "../basic/energizedObject.js"

export class StationaryObject {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                EnergizedObject,
                FocusedTopDownBehavior
            ],
            build
        )

        this.priority += 1

        this.maxLife = 100

        this.graphicID = "turret"

        this.defense = 2
        this.resistance -= 0.02

        this.width += 6
        this.height += 6

        this.energy = 100
        this.maxEnergy = 100
        this.energyRegen = 0.5

        this.damage = 2

    }

    passBuildList = {

        "stationaryObject_life": (updateThis) => {

            updateThis.life.set(100)
    
        }

    }

}