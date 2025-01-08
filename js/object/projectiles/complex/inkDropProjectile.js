
import { DamageController } from "../../../damage/damageController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { SmallBulletProjetile } from "./smallBulletProjectile.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class InkDropProjectile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SmallBulletProjetile
            ],
            build
            
        )

        this.width *= 1.5
        this.height *= 1.5

        this.graphicID = "ink drop"

        this.damage = 1

        Damage.addDamage(this, "physical", 0, true)
        Damage.addDamage(this, "ink", 1)

    }

}