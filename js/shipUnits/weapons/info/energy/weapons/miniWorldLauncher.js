import { InheritController } from "../../../../../generalUtils/inherit.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class MiniWorldLauncher {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                WeaponExtend,
            ],
            build
        )

        this.name = "mini world launcher"
        this.cost = 80
        this.reload = 10*60

        this.lifeTime = 2000

        this.config.weapon.multVel = 1
        this.config.weapon.damageMult = 2

        this.config.projectiles.objectClass = ["mini world"]

    }

}