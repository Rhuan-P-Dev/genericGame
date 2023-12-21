
import { InheritController } from "../../../../generalUtils/inherit.js"
import { WeaponExtend } from "../extend/weapon.js"

export class Bubbler1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                WeaponExtend
            ],
            build
        )

        this.name = "bubbler 1"
        this.cost = 9
        this.reload = 9

        this.lifeTime = 200

        this.config.weapon.damageMult = 2
        this.config.weapon.multVel = 2

        this.config.projectiles.objectClass = ["explosive small bullet"]

        this.modifiersList = ["mid widen","distortion"]

    }

}