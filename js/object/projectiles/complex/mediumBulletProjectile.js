import { InheritController } from "../../../generalUtils/inherit.js"
import { SmallBulletProjetile } from "./smallBulletProjectile.js"

export class MediumBulletProjetiles {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SmallBulletProjetile
            ],
            build
            
        )

        this.damage *= 1.5

        this.maxLife *= 5

        this.width *= 2
        this.height *= 2

    }

    passBuildList = {

        "mediumBulletProjetiles_life": (updateThis) => {
            updateThis.life.math("*", 5)
        },

    }

}