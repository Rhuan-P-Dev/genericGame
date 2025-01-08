
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { SnowLauncherStormEffect } from "../../effects/snowLauncherStormEffect.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class SnowLauncher {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                WeaponExtend,
                SnowLauncherStormEffect
            ],
            build
        )

        this.name = "snow launcher"
        this.cost = 20
        this.reload = 1*60

        this.lifeTime = 100

        this.config.weapon.multVel = 6

        this.config.projectiles.objectClass = ["medium snow bullet"]

    }

}