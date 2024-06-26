
import { InheritController } from "../../../generalUtils/inherit.js"
import { StatsObserverController } from "../../instructions/statsObserverController.js"
import { BasicProjetile } from "../basic/basicProjetile.js"

export class SmallBulletProjetile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicProjetile
            ],
            build
            
        )

        this.graphicID = "bullet"

        this.maxLife = 1

        this.damage = 10

        this.width = 3
        this.height = 3

        this.lifeTime = 30

    }

    passBuildList = {

        "smallBulletProjetile_life": (updateThis) => {
            updateThis.life = new StatsObserverController(updateThis, "life", 1)
        },

    }

}