
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { IsLaser } from "../../extend/isLaser.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class LaserWeb {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                WeaponExtend,
                IsLaser
            ],
            build
        )

        this.name = "laser web"
        this.cost = 20
        this.reload = 10

        this.lifeTime = 5

        this.config.weapon.multVel = 0
        this.config.weapon.damageMult = 2

        this.range = 80

        this.config.projectiles.objectClass = ["guided laser","guided laser","guided laser","guided laser"]

        this.modifiersList = ["widen","widen"]

    }

}