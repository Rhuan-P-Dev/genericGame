import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { MissileCluster1Effect } from "../effects/missileCluster1Effect.js"
import { HomingWeapon } from "../extend/homingWeapon.js"
import { WeaponExtend } from "../extend/weapon.js"

export class MissileCluster1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                FocusedTopDownBehavior,
                HomingWeapon,
                WeaponExtend,
                MissileCluster1Effect
            ],
            build
        )

        this.name = "missile cluster 1"
        this.cost = 150
        this.reload = 5*60

        this.lifeTime = 50
        this.range = this.lifeTime*5

        this.config.weapon.multVel = 1
        this.config.weapon.damageMult = 2

        this.config.projectiles.objectClass = ["simple missile"]

        this.config.projectiles.AI = {
            0: ["missileV1"]
        }

    }

}