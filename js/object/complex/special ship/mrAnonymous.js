import { InheritController } from "../../../generalUtils/inherit.js"
import { Ship } from "../ship.js"

/* Inspiration(s)

Name idea: Jack, O Estripador (Record of Ragnarok) - LONDON BRIDGE IS FALLEN DOWN |Ft: Yuzo & Hikari | Kønn 05 - https://youtu.be/AXTtYve_piw?si=1ZJ8eQyf1KFOduN7&t=81
Special idea: Shinigami... Ou Hollow | Ichigo Kurosaki (Bleach) | Enygma 93 - https://www.youtube.com/watch?v=vjMMQ46ljF8&t=255s

*/

export class MrAnonymous {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship
            ],
            build
        )

        this.graphicID = "mrAnonymous"

        this.defense *= 0.7
        this.damage *= 0.7

        this.maxLife *= 0.5

        this.maxEnergy *= 0.5
        this.energy *= 0.5

    }

    passBuildList = {

        "MrAnonymous_life": (updateThis) => {

            updateThis.life.math("*", 0.5)

        },

        "MrAnonymous_special": (updateThis) => {

            updateThis.addActivateObserver.add(
                (activate) => {

                    activate.cost = 0

                }
            )

        },

    }

}