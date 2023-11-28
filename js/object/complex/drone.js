import { FocusedTopDownBehavior } from "../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { EnergizadObject } from "../basic/energizedObject.js"
import { MovableObject } from "../basic/movableObject.js"
import { RotableObject } from "../basic/rotableObject.js"

export class Drone {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                EnergizadObject,
                RotableObject,
                MovableObject,
                FocusedTopDownBehavior,
            ],
            build
        )

        this.priority += 2

        this.vel /= 2
        this.maxVel /= 2

        this.life = 50
        this.maxLife = 50

        this.defense = 1
        this.resistance = 1

        this.width = 3
        this.height = 3
    
        this.energy = 50
        this.maxEnergy = 50
        this.energyRegen = 0.15

        this.damage = 2

    }

}