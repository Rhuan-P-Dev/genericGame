import { FocusedTopDownBehavior } from "../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../generalUtils/inherit.js"
import { EnergizadObject } from "./basic/energizedObject.js"
import { MovableObject } from "./basic/movableObject.js"
import { RotableObject } from "./basic/rotableObject.js"

export class Drone {

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

        this.priority += 2

        this.vel /= 2
        this.maxVel /= 2

    }

    life = 50
    maxLife = 50

    defense = 1
    resistance = 1

    width = 3
    height = 3
    
    energy = 50
    maxEnergy = 50
    energyRegen = 0.15

}