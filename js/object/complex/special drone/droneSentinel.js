import { InheritController } from "../../../generalUtils/inherit.js"
import { DroneV2 } from "../droneV2.js"

export class DroneSentinel{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DroneV2,
            ],
            build
        )

        this.graphicID = "drone sentinel - upscale"

        this.priority += 3

        this.defense *= 6

        this.energy *= 2
        this.maxEnergy *= 2
        this.energyRegen *= 1.1

        this.vel *= 1.5
        this.rotationVel *= 1.5

        this.lifeRegen = -1/60

    }

}