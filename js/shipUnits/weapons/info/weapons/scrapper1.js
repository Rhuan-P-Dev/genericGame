
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Scrapper1Effect } from "../effects/scrapper1Effect.js"
import { WeaponExtend } from "../extend/weapon.js"

export class Scrapper1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                Scrapper1Effect,
                WeaponExtend
            ],
            build
        )

        this.name = "scrapper 1"
        this.cost = 2
        this.reload = 5
        
        this.lifeTime = 30

        this.config.weapon.multVel = 11
        this.config.weapon.damageMult = 0.5

        this.config.projectiles.objectClass = ["small bullet"]

        this.modifiersList = ["spread","distortion"]

    }

}