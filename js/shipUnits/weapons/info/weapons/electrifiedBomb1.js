
import { InheritController } from "../../../../generalUtils/inherit.js"
import { ElectrifiedBomb1Effect } from "../effects/electrifiedBomb1Effect.js"
import { WeaponExtend } from "../extend/weapon.js"

export class ElectrifiedBomb1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                ElectrifiedBomb1Effect,
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

        this.config.projectiles.objectClass = ["explosive medium bullet"]

    }

}