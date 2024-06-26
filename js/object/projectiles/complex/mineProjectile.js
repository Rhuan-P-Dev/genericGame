  
import { MediumExplosionDamage } from "../../../damage/damageTypes/mediumExplosion.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { StatsObserverController } from "../../instructions/statsObserverController.js"
import { BasicExplosiveProjectile } from "../basic/basicExplosiveProjectile.js"

export class MineProjetile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                MediumExplosionDamage,
                BasicExplosiveProjectile,
            ],
            build
        )

        this.graphicID = "mine"

        this.damage = 100

        this.width = 6
        this.height = 6

        this.maxLife = 50

        this.lifeTime = 10*60

    }

    passBuildList = {

        "mineProjetile_life": (updateThis) => {
            updateThis.life.set(50)
        },

    }

}