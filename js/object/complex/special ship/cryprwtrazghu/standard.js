import { InheritController } from "../../../../generalUtils/inherit.js"
import { DroneV2 } from "../../droneV2.js"

export class Cryprwtrazghu_standard {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DroneV2
            ],
            build
        )

        this.priority += 1

        this.maxLife *= 1.25

        this.defense *= 2

        this.width += 1
        this.height += 1

        this.energy *= 1.5
        this.maxEnergy *= 1.5

        this.damage *= 1.5

        this.shield *= 1.25
        this.maxShield *= 1.25
        this.shieldRegen *= 1.1

    }

    passBuildList = {

        "standard_life": (updateThis) => {

            updateThis.life.math("*", 1.5)
    
        }

    }

}