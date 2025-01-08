import { InheritController } from "../../../generalUtils/inherit.js"
import { SmallSnowBulletProjectile } from "./smallSnowBulletProjectile.js"

export class MediumSnowBulletProjetiles {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SmallSnowBulletProjectile
            ],
            build
            
        )

        this.damage *= 1.5

        this.maxLife *= 5

        this.width *= 2
        this.height *= 2

        this.lifeTime *= 1.25

    }

    passBuildList = {

        "mediumBulletProjetiles_life": (updateThis) => {
            updateThis.life.math("*", 5)
        },

    }

}