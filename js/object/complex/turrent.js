
import { FocusedTopDownBehavior } from "../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { EnergizadObject } from "../basic/energizedObject.js"
import { RotableObject } from "../basic/rotableObject.js"

export class Turret {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                RotableObject,
                EnergizadObject,
                FocusedTopDownBehavior,
            ],
            build
        )

        this.priority += 1

        this.life = 100
        this.maxLife = 100

        this.defense = 2
        this.resistance = 0.98

        this.width = 4
        this.height = 4

        this.energy = 100
        this.maxEnergy = 100
        this.energyRegen = 0.5

        this.rotationVel *= 3

    }

}