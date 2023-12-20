import { MediumExplosionDamage } from "../../../damage/damageTypes/mediumExplosion.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { BasicExplosiveProjectile } from "../basic/basicExplosiveProjectile.js"
import { MediumBulletProjetiles } from "./mediumBulletProjectile.js"

export class ExplosiveMediumBulletProjectile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                MediumExplosionDamage,
                MediumBulletProjetiles,
                BasicExplosiveProjectile,
            ],
            build
            
        )

    }

}