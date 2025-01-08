
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class BoneLauncher {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                WeaponExtend,
            ],
            build
        )

        this.name = "bone launcher"
        this.cost = 30
        this.reload = 10
        
        this.lifeTime = 100

        this.config.weapon.multVel = 5
        this.config.weapon.damageMult = 1

        this.config.projectiles.objectClass = ["bone"]

    }

}