import { FocusedTopDownBehavior } from "../../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { HomingWeapon } from "../../extend/homingWeapon.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class Missilepiston {

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

        this.name = "missilepiston"
        this.cost = 30
        this.reload = 30

        this.lifeTime = 100
        this.range = this.lifeTime*4

        this.config.weapon.multVel = 1
        this.config.weapon.damageMult = 0.6

        this.config.projectiles.objectClass = ["simple missile"]

        this.config.projectiles.AI = {
            0: ["missileV1","useActivates"]
        }

        this.config.projectiles.activates = {
            0: {
                "weapon": ["piston 1"]
            }
        }

    }

}