import { FocusedTopDownBehavior } from "../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../generalUtils/inherit.js"
import { EnergizadObject } from "./basic/energizedObject.js"
import { MovableObject } from "./basic/movableObject.js"
import { RotableObject } from "./basic/rotableObject.js"

export class Ship {

    constructor(){

         

        new InheritController().inherit(
            this,
            [
                EnergizadObject,
                RotableObject,
                MovableObject,
                FocusedTopDownBehavior,
            ]
        )

    }

    priority = 5

    life = 200
    maxLife = 200

    defense = 4
    resistance = 0.97

    width = 6
    height = 6
    
    energy = 200
    maxEnergy = 200
    energyRegen = 0.3

}