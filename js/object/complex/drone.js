import { FocusedTopDownBehavior } from "../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { EnergizedObject } from "../basic/energizedObject.js"
import { MovableObject } from "../basic/movableObject.js"
import { RotableObject } from "../basic/rotableObject.js"

export class Drone {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                EnergizedObject,
                RotableObject,
                MovableObject,
                FocusedTopDownBehavior,
            ],
            build
        )

        this.graphicID = "drone v1"

        this.priority += 1

        this.vel /= 2
        this.maxVel /= 2

        this.maxLife = 50

        this.defense = 1
        this.resistance = 1

        this.width = 5
        this.height = 5
    
        this.energy = 50
        this.maxEnergy = 50
        this.energyRegen = 0.15

        this.damage = 2

    }

    passBuildList = {

        "drone_life": (updateThis) => {

            updateThis.life.set(50)
    
        }

    }

}