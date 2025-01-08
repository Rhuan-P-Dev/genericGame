
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { IsLaser } from "../../extend/isLaser.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class RedemptionLance {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                WeaponExtend,
                IsLaser
            ],
            build
        )

        this.name = "redemption lance"
        this.cost = 15
        this.reload = 0.75*60

        this.lifeTime = 6

        this.config.weapon.multVel = 0
        this.config.weapon.damageMult = 1.5

        this.range = 150

        this.config.projectiles.objectClass = ["ink laser"]
        this.modifiersList = ["machinegun"]

    }

}