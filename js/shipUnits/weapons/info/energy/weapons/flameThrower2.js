
import { DamageController } from "../../../../../damage/damageController.js"
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { FlameThrower1 } from "./flameThrower1.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class FlameThrower2 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                FlameThrower1
            ],
            build
        )

        this.name = "flame thrower 2"
        this.cost *= 1.4
        this.reload *= 1.2

        this.lifeTime *= 1.1

        this.config.weapon.multVel *= 1.5
        this.config.weapon.damageMult *= 1.2

        Damage.addDamage(this, "fire", 0.1)

    }

}