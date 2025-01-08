
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { IsLaser } from "../../extend/isLaser.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class Lance1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                WeaponExtend,
                IsLaser
            ],
            build
        )

        this.name = "lance 1"
        this.cost = 30
        this.reload = 2*60

        this.lifeTime = 5

        this.config.weapon.multVel = 0
        this.config.weapon.damageMult = 3

        this.range = 150

        this.config.projectiles.objectClass = ["laser"]

    }

}