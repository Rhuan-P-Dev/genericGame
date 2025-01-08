
import { DamageController } from "../../../damage/damageController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { SnowProperties } from "../../uncommon/snowProperties.js"
import { SmallBulletProjetile } from "./smallBulletProjectile.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class SmallSnowBulletProjectile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SmallBulletProjetile,
                SnowProperties
            ],
            build
            
        )

        Damage.addDamage(this, "snow", 1)

        Damage.addDamage(this, "physical", 0.25, true)

        this.lifeTime = 50

    }

}