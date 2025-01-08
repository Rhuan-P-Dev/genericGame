
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class Piston1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                WeaponExtend
            ],
            build
        )

        this.name = "piston 1"
        this.cost = 5
        this.reload = 7

        this.lifeTime = 30

        this.config.weapon.multVel = 12

        this.config.projectiles.objectClass = ["small bullet"]

        this.modifiersList = ["spread","distortion"]

    }

}