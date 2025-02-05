import { FocusedTopDownBehavior } from "../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { EnergizedObject } from "../basic/energizedObject.js"
import { MovableObject } from "../basic/movableObject.js"
import { RotableObject } from "../basic/rotableObject.js"
import { ShieldObject } from "../basic/shieldObject.js"
import { StandardArmor } from "../basic/standardArmor.js"

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
                StandardArmor
            ],
            build
        )

        this.graphicID = "ship"

        this.rotationVel *= 2

        this.priority = 6

        this.maxLife = 200

        this.defense = 4
        this.resistance = 0.97

        this.width = 12
        this.height = 12
    
        this.energy = 200
        this.maxEnergy = 200
        this.energyRegen = 0.3

        this.damage = 10

        this.vel *= 1.5

    }

    passBuildList = {

        "ship_life": (updateThis) => {

            updateThis.life.set(200)

        }

    }

}