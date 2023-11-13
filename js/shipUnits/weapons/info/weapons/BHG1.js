
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

export class BHG1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                Weapon
            ],
            build
        )

    }

    name = "BHG1"
    cost = 100
    reload = 60*20
    weaponConfig = {
        multVel: 1,
        damageMult: 1,
    }

    lifeTime = 250

    func = Weapons.createBlackHole

}