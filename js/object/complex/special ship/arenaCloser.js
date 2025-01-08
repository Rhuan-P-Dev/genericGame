import { InheritController } from "../../../generalUtils/inherit.js"
import { Ship } from "../ship.js"

/* Inspiration(s)

Overall idea: Arena closer from https://diep.io/

*/

export class ArenaCloser {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
            ],
            build
        )

        this.graphicID = "arena closer"

        this.rotationVel *= 1.1

        this.priority *= 5

        this.shield *= 10
        this.maxShield *= 10
        this.shieldRegen *= 10

        this.maxLife *= 10

        this.defense *= 4
        this.resistance -= 0.2

        this.width *= 1.5
        this.height *= 1.5
    
        this.energy *= 10
        this.maxEnergy *= 10
        this.energyRegen *= 10

        this.damage *= 10

        this.vel *= 2
        this.maxVel *= 2

    }

    passBuildList = {

        "ArenaCloser_life": (updateThis) => {

            updateThis.life.math("*", 10)

        }

    }

}