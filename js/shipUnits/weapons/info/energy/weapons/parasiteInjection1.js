
import { FocusedTopDownBehavior } from "../../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { ParasiteInjection1Effect } from "../../effects/parasiteInjection1Effect.js"
import { HomingWeapon } from "../../extend/homingWeapon.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class ParasiteInjection1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                ParasiteInjection1Effect,
                FocusedTopDownBehavior,
                HomingWeapon,
                WeaponExtend,
            ],
            build
        )

        this.name = "parasite injection 1"
        this.cost = 100
        this.reload = 2*60
        
        this.lifeTime = 250

        this.config.weapon.multVel = 2
        this.config.weapon.damageMult = 0

        this.config.projectiles.objectClass = ["simple missile"]

        this.config.projectiles.AI = {
            0: ["missileV1"]
        }

    }

}