
import { FocusedTopDownBehavior } from "../../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { HomingWeapon } from "../../extend/homingWeapon.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class MissileBurst1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                WeaponExtend,
                FocusedTopDownBehavior,
                HomingWeapon,
            ],
            build
        )

        this.name = "missile burst 1"
        this.cost = 10
        this.reload = 60

        this.lifeTime = 200
        this.range = this.lifeTime*4

        this.config.weapon.multVel = 2
        this.config.weapon.damageMult = 0.5

        this.config.projectiles.objectClass = ["simple missile"]

        this.config.projectiles.AI = {
            0: ["missileV1"]
        }

        this.modifiersList = ["burst"]
    
    }

}