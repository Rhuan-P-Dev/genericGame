import { InheritController } from "../../../../generalUtils/inherit.js"
import { WeaponExtend } from "../extend/weapon.js"

export class Diffusion1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                WeaponExtend
            ],
            build
        )

        this.name = "diffusion 1"
        this.cost = 2
        this.reload = 5
        
        this.lifeTime = 30

        this.config.weapon.multVel = 11
        this.config.weapon.damageMult = 4

        this.config.projectiles.objectClass = ["small bullet"]

        this.modifiersList = ["widen","distortion"]

    }

}