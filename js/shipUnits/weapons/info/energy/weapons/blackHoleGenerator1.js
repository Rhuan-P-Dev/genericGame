
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class BlackHoleGenerator1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                WeaponExtend
            ],
            build
        )

        this.name = "black hole generator 1"
        this.cost = 600
        this.reload = 60*60

        this.lifeTime = 250

        this.config.weapon.multVel = 1
        this.config.weapon.damageMult = 1

        this.config.projectiles.objectClass = ["black hole"]

    }

}