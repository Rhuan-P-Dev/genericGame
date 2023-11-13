import { InheritController } from "../../../../generalUtils/inherit.js"
import { WeaponsController } from "../../weaponsController.js"

import { P1 } from "./P1.js"

var Weapons = ""

onInit(function(){

    Weapons = new WeaponsController()

})

export class SP1{

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                P1
            ],
            build
        )

        this.cost *= 15
        this.reload *= 15

        this.config.weapon.multVel *= 2
        this.config.weapon.damageMult = 10

        this.lifeTime *= 1.5

    }

    name = "SP1"

    modifiersList = []

}