import { DamageController } from "../../../../damage/damageController.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { BasicLaserProjectile } from "../../basic/basicLaserProjectile.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class InkLaserProjectile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicLaserProjectile
            ],
            build
        )

        this.damage = 2
        this.laserColor = "white"

        Damage.addDamage(this, "ink", 1)

        this.preLaserObserver.add((params) => {

            console.log(params)

            params.object.laserColor = params.owner.color

        })

    }

}