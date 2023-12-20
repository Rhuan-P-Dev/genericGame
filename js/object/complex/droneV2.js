import { InheritController } from "../../generalUtils/inherit.js"
import { SmallShieldObject } from "../basic/smallShieldObject.js"
import { Drone } from "./drone.js"

export class DroneV2 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Drone,
                SmallShieldObject,
            ],
            build
        )

        this.vel *= 2

        this.life *= 1.6
        this.maxLife *= 1.6

        this.defense *= 2
        this.resistance = 0.98

        this.width += 1
        this.height += 1
    
        this.energy *= 1.1
        this.maxEnergy *= 1.1
        this.energyRegen *= 2

        this.rotationVel *= 2

        this.damage *= 1.5

    }

}