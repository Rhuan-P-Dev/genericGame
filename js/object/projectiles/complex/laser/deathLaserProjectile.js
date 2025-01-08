import { DamageController } from "../../../../damage/damageController.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { BasicLaserProjectile } from "../../basic/basicLaserProjectile.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class DeathLaserProjectile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicLaserProjectile
            ],
            build
        )

        this.damage = 2.5
        this.laserColor = "black"

        Damage.addDamage(this, "death", 1)

    }

}