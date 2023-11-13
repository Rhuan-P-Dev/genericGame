
import { DamageController } from "../../../damage/damageController.js"
import { ExplosionDamage } from "../../../damage/damageTypes/explosion.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { BasicProjetile } from "./basicProjetile.js"

export class BasicExplosiveProjectile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                ExplosionDamage,
                BasicProjetile,
            ],
            build
        )
        
    }

    passBuildList = {
        ["add_basic_" + explosiveProjectileDeath.name]: (updateThis) => {

            updateThis.onDeath.add(explosiveProjectileDeath,"last",0)

            updateThis.onHit.remove("last",10) // damage

        }
    }

}

function explosiveProjectileDeath(params){

    new DamageController().radiusCalc(
        params.object
    )

}