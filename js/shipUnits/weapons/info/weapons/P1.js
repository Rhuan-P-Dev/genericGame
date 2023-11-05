
import { InheritController } from "../../../../generalUtils/inherit.js"
import { WeaponsModifiersController } from "../../modifiers/weaponsModifiersController.js"
import { WeaponsController } from "../../weaponsController.js"
import { Weapon } from "../weapon_extend/weapon.js"

var Weapons = ""
var WeaponsModifiers = ""

onInit(function(){

    Weapons = new WeaponsController()
    WeaponsModifiers = new WeaponsModifiersController()

})

export class P1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                Weapon
            ],
            build
        )

    }

    name = "P1"
    cost = 5
    reload = 7
    reloadTemp = 0
    reloadStep = 1
    config = {
        multVel: 8,
        damageMult: 1,
    }
    lifeTime = 30

    baseFunc = Weapons.createShoot

    modifiersList = ["spread"]

    build(){

        for (let index = 0; index < this.modifiersList.length; index++) {

            WeaponsModifiers.addModifier(this, this.modifiersList[index])
            
        }

    }

}