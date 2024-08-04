
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { Fragilizer1Effect } from "../../effects/fragilizer1Effect.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class Fragilizer1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                Fragilizer1Effect,
                WeaponExtend
            ],
            build
        )

        this.name = "fragilizer 1"
        this.cost = 60
        this.reload = 1*60

        this.lifeTime = 30

        this.config.weapon.multVel = 16

        this.config.projectiles.objectClass = ["medium bullet"]

    }

}