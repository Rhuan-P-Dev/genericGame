import { InheritController } from "../../../../generalUtils/inherit.js"

import { Piston1 } from "./piston1.js"

export class SniperPiston1{

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                Piston1
            ],
            build
        )

        this.name = "sniper piston 1"

        this.cost *= 15
        this.reload *= 15

        this.config.weapon.multVel *= 2
        this.config.weapon.damageMult = 10

        this.lifeTime *= 1.5

        this.modifiersList = []

    }


}