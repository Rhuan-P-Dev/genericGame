  
import { MediumExplosionDamage } from "../../../damage/damageTypes/mediumExplosion.js"
import { InheritController } from "../../../generalUtils/inherit.js"
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

        this.damage = 100

        this.width = 6
        this.height = 6

        this.maxLife = 50
        this.life = 50

        this.lifeTime = 60*10

    }

}