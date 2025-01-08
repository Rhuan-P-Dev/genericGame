import { InheritController } from "../../../generalUtils/inherit.js"
import { SelfSwarmObject } from "../../uncommon/selfSwarmObject.js"
import { DroneV2 } from "../droneV2.js"

export class SelfSwarmDrone{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DroneV2,
                SelfSwarmObject
            ],
            build
        )

        this.graphicID = "self swarm drone"

        this.priority += 1

        this.defense *= 5

        this.vel *= 1.25
        this.maxVel *= 1.25
        this.rotationVel *= 1.5

        this.lifeRegen = -4/60

    }

}