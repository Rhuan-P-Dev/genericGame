
import { InheritController } from "../../../../generalUtils/inherit.js"
import { WeaponExtend } from "./weapon.js"
import { DamageController } from "../../../../damage/damageController.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class DarkEnergyWeapon{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                WeaponExtend
            ],
            build
        )

        this.consumableStat = "darkEnergy"
        
        Damage.addDamage(this, "dark energy", 1, true)

        this.defenses = {
            "dark energy": 1
        }

    }

}