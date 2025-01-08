
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { IsLaser } from "../../extend/isLaser.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class BigLaser {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                WeaponExtend,
                IsLaser
            ],
            build
        )

        this.name = "big laser"
        this.cost = 20
        this.reload = 60

        this.lifeTime = 4

        this.config.weapon.multVel = 0
        this.config.weapon.damageMult = 2

        this.range = 200

        this.config.projectiles.objectClass = ["big laser"]

    }

}