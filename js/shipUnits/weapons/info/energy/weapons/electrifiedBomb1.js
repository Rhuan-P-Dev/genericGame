
import { DamageController } from "../../../../../damage/damageController.js"
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { ElectrifiedBomb1Animation } from "../../animations/electrifiedBomb1Animation.js"
import { WeaponExtend } from "../../extend/weapon.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class ElectrifiedBomb1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                ElectrifiedBomb1Animation,
                WeaponExtend,
            ],
            build
        )

        this.name = "electrified bomb 1"
        this.cost = 150
        this.reload = 10*60

        this.lifeTime = 80

        this.config.weapon.multVel = 6
        this.config.weapon.damageMult = 5

        Damage.addDamage(this, "shock", 1)

        this.config.projectiles.objectClass = ["explosive medium bullet"]

    }

}