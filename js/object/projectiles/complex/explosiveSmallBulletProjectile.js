
import { ExplosionDamage } from "../../../damage/damageTypes/explosion.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { BasicExplosiveProjectile } from "../basic/basicExplosiveProjectile.js"
import { SmallBulletProjetile } from "./smallBulletProjectile.js"

export class ExplosiveSmallBulletProjetile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                ExplosionDamage,
                SmallBulletProjetile,
                BasicExplosiveProjectile,
            ],
            build
            
        )

        this.graphicID = "explosive bullet"

    }

}