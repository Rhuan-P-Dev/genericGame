import { FocusedTopDownBehavior } from "../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { ttttttttttttttttttt } from "../../graphics/complexShapes/test.js"
import { EnergizedObject } from "../basic/energizedObject.js"
import { MovableObject } from "../basic/movableObject.js"
import { RotableObject } from "../basic/rotableObject.js"
import { ShieldObject } from "../basic/shieldObject.js"

export class Ship {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                EnergizedObject,
                RotableObject,
                MovableObject,
                FocusedTopDownBehavior,
                ShieldObject,
                ttttttttttttttttttt
            ],
            build
        )

        this.rotationVel *= 2

        this.priority = 5

        this.life = 200
        this.maxLife = 200

        this.defense = 4
        this.resistance = 0.97

        this.width = 6
        this.height = 6
    
        this.energy = 200
        this.maxEnergy = 200
        this.energyRegen = 0.3

        this.damage = 10

    }

}