
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { IsLaser } from "../../extend/isLaser.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class SniperLaser1 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                WeaponExtend,
                IsLaser
            ],
            build
        )

        this.name = "sniper laser 1"
        this.cost = 100
        this.reload = 10*60

        this.lifeTime = 10

        this.config.weapon.multVel = 0
        this.config.weapon.damageMult = 5

        this.range = 350

        this.config.projectiles.objectClass = ["laser"]

    }

}