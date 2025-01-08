import { InheritController } from "../../../../../generalUtils/inherit.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class PaintingMachinegun {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                WeaponExtend
            ],
            build
        )

        this.name = "painting machinegun"
        this.cost = 1.1
        this.reload = 15

        this.lifeTime = 25

        this.config.weapon.multVel = 15
        this.config.weapon.damageMult = 1

        this.config.projectiles.objectClass = ["ink drop"]

        this.modifiersList = ["machinegun","spread","distortion"]

    }

}