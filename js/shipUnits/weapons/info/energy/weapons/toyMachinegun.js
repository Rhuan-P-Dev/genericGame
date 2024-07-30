import { InheritController } from "../../../../../generalUtils/inherit.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class ToyMachinegun {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                WeaponExtend
            ],
            build
        )

        this.name = "toy machinegun"
        this.cost = 0.5
        this.reload = 10

        this.lifeTime = 20

        this.config.weapon.multVel = 15
        this.config.weapon.damageMult = 0.5

        this.config.projectiles.objectClass = ["small bullet"]

        this.modifiersList = ["machinegun","spread","distortion"]

    }

}