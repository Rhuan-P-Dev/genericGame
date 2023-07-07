
import { InheritController } from "../../../../generalUtils/inherit.js"
import { AutoWeapon } from "../weapon_extend/autoWapon.js"
import { P1 } from "./P1.js"


import { WeaponsModifiersController } from "../../modifiers/weaponsModifiersController.js"

var WeaponsModifiers = ""

onInit(function(){

    WeaponsModifiers = new WeaponsModifiersController()

})

export class Auto_P1{

    constructor(){
        
        new InheritController().inherit(
            this,
            [
                AutoWeapon,
                P1,
            ]
        )

        this.name = "auto_P1"

        this.cost /= 3
        this.config.damageMult /= 2
        this.config.multVel /= 2

    }

}