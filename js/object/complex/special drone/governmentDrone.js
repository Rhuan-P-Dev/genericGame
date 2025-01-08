import { InheritController } from "../../../generalUtils/inherit.js"
import { BigDrone } from "../bigDrone.js"

export class GovernmentDrone {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BigDrone,
            ],
            build
        )

        this.graphicID = "government drone"

        this.shield *= 1.1
        this.maxShield *= 1.1

        this.vel *= 1.1
        this.maxVel *= 1.05

        this.priority += 1
        this.priority *= 1.1

        this.maxLife *= 1.2

        this.defense *= 1.15
        this.resistance -= 0.01

        this.energy *= 1.1
        this.maxEnergy *= 1.1

        this.rotationVel *= 1.1

        this.damage *= 1.5

    }

    passBuildList = {

        "GovernmentDrone_life": (updateThis) => {
            updateThis.life.math("*", 1.05)
        },

    }

}