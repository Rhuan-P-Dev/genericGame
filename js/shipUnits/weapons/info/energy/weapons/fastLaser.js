
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { IsLaser } from "../../extend/isLaser.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class FastLaser {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                WeaponExtend,
                IsLaser
            ],
            build
        )

        this.name = "fast laser"
        this.cost = 10
        this.reload = 8

        this.lifeTime = 2

        this.config.weapon.multVel = 0
        this.config.weapon.damageMult = 2

        this.range = 150

        this.config.projectiles.objectClass = ["laser"]

    }

}