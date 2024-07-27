import { InheritController } from "../../generalUtils/inherit.js"
import { SmallShieldObject } from "../basic/smallShieldObject.js"
import { StandardArmor } from "../basic/standardArmor.js"
import { Drone } from "./drone.js"

export class DroneV2 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Drone,
                SmallShieldObject,
                StandardArmor
            ],
            build
        )

        this.graphicID = "drone v2"

        this.vel *= 2

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

    passBuildList = {

        "droneV2_life": (updateThis) => {
            updateThis.life.math("*", 1.6)
        },

    }

}