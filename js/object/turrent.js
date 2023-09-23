
import { FocusedTopDownBehavior } from "../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../generalUtils/inherit.js"
import { EnergizadObject } from "./basic/energizedObject.js"
import { RotableObject } from "./basic/rotableObject.js"

export class Turret {

    constructor(){

        new InheritController().inherit(
            this,
            [
                RotableObject,
                EnergizadObject,
                FocusedTopDownBehavior,
            ]
        )

        this.priority += 1

    }

    life = 100
    maxLife = 100

    defense = 2
    resistance = 0.98

    width = 4
    height = 4

    energy = 100
    maxEnergy = 100
    energyRegen = 0.1

}