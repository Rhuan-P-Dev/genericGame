
import { FocusedTopDownBehavior } from "../../../../../AI/behavior/focusedTopDownBehavior.js"
import { DamageController } from "../../../../../damage/damageController.js"
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { ElectrifiedMissile1Animation } from "../../animations/electrifiedMissile1Animation.js"
import { HomingWeapon } from "../../extend/homingWeapon.js"
import { WeaponExtend } from "../../extend/weapon.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class ElectrifiedMissile1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                ElectrifiedMissile1Animation,
                FocusedTopDownBehavior,
                HomingWeapon,
                WeaponExtend,
            ],
            build
        )

        this.name = "electrified missile 1"
        this.cost = 30
        this.reload = 1*60

        this.lifeTime = 125
        this.range = this.lifeTime*4

        this.config.weapon.multVel = 2
        this.config.weapon.damageMult = 0.25

        Damage.addDamage(this, "shock", 2.25)

        this.config.projectiles.objectClass = ["simple missile"]

        this.config.projectiles.AI = {
            0: ["missileV1"]
        }

    }

}