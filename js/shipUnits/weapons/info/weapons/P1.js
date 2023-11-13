
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
    weaponConfig = {
        multVel: 8,
        damageMult: 1,
    }
    
    lifeTime = 30

  

    func = Weapons.createShoot

    modifiersList = ["spread","distortion"]

}