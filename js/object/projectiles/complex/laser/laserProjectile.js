import { DamageController } from "../../../../damage/damageController.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { BasicLaserProjectile } from "../../basic/basicLaserProjectile.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class LaserProjectile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicLaserProjectile
            ],
            build
        )

        this.damage = 5
        this.laserColor = "red"

        Damage.addDamage(this, "laser", 1)
        Damage.addDamage(this, "fire", 0.1)

    }

}