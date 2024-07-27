
import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { HomingWeapon } from "../extend/homingWeapon.js"
import { WeaponExtend } from "../extend/weapon.js"

export class DeathHandLauncher {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                FocusedTopDownBehavior,
                HomingWeapon,
                WeaponExtend,
            ],
            build
        )

        this.name = "death hand launcher"
        this.cost = 200
        this.reload = 4*60
        
        this.lifeTime = 500

        this.config.weapon.multVel = 2
        this.config.weapon.damageMult = 1

        this.config.projectiles.objectClass = ["death's hand"]

        this.config.projectiles.AI = {
            0: ["missileV1"]
        }

    }

}