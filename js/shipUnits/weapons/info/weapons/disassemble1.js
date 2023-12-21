
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Disassemble1Effect } from "../effects/disassemble1Effect.js"
import { WeaponExtend } from "../extend/weapon.js"

export class Disassemble1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                Disassemble1Effect,
                WeaponExtend,
            ],
            build
        )

        this.name = "disassemble 1"
        this.cost = 30
        this.reload = 30

        this.lifeTime = 30

        this.config.weapon.multVel = 14
        this.config.weapon.damageMult = 3

        this.config.projectiles.objectClass = ["small bullet"]

    }

}