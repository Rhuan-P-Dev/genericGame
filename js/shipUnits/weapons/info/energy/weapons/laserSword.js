
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { IsLaser } from "../../extend/isLaser.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class LaserSword {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                WeaponExtend,
                IsLaser
            ],
            build
        )

        this.name = "laser sword"
        this.cost = 1
        this.reload = 4

        this.lifeTime = 1

        this.config.weapon.multVel = 0
        this.config.weapon.damageMult = 1

        this.range = 100

        this.config.projectiles.objectClass = ["laser"]

        this.modifiersList = ["machinegun"]

    }

}