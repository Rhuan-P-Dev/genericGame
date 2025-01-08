
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { IsLaser } from "../../extend/isLaser.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class DeathRay {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                WeaponExtend,
                IsLaser
            ],
            build
        )

        this.name = "death ray"
        this.cost = 50
        this.reload = 5*60

        this.lifeTime = 20

        this.config.weapon.multVel = 0
        this.config.weapon.damageMult = 2

        this.range = 300

        this.config.projectiles.objectClass = ["big death laser"]

    }

}