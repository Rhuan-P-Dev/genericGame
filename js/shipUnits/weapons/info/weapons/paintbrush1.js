
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Paintbrush1Effect } from "../effects/paintbrush1Effect.js"
import { WeaponExtend } from "../extend/weapon.js"

export class Paintbrush1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [

                Paintbrush1Effect,
                WeaponExtend,
            ],
            build
        )

        this.name = "paintbrush 1"
        this.cost = 150
        this.reload = 60*60
        
        this.lifeTime = 200

        this.config.weapon.multVel = 7
        this.config.weapon.damageMult = 0

        this.config.projectiles.objectClass = ["small bullet"]

    }

}