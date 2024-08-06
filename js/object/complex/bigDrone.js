import { InheritController } from "../../generalUtils/inherit.js"
import { DroneV2 } from "./droneV2.js"

export class BigDrone {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DroneV2,
            ],
            build
        )

        this.graphicID = "big drone"

        // ugly - same stats form shieldObject.js
        this.shield *= 5
        this.maxShield *= 5
        this.shieldRegen *= 5

        this.vel *= 1.1
        this.maxVel *= 1.2

        this.priority += 1

        this.maxLife *= 1.2

        this.defense *= 2
        this.resistance = 0.97

        this.width += 3
        this.height += 3
    
        this.energy *= 1.1
        this.maxEnergy *= 1.1

        this.rotationVel *= 1.25

        this.damage *= 2

    }

    passBuildList = {

        "bigDrone_life": (updateThis) => {
            updateThis.life.math("*", 1.2)
        },

    }

}