
import { DamageController } from "../../../../../damage/damageController.js"
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { FlameThrower1Animation } from "../../animations/flameThrower1Animation.js"
import { WeaponExtend } from "../../extend/weapon.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class FlameThrower1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                FlameThrower1Animation,
                WeaponExtend
            ],
            build
        )

        this.name = "flame thrower 1"
        this.cost = 10
        this.reload = 4

        this.lifeTime = 25
        this.range = this.lifeTime*2

        this.config.weapon.multVel = 3
        this.config.weapon.damageMult = 0.3

        Damage.addDamage(this, "fire", 0.5)

        this.config.projectiles.objectClass = ["medium bullet"]

        this.modifiersList = ["spread","distortion"]

    }

}