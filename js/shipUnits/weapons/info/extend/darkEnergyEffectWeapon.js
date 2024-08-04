
import { DamageController } from "../../../../damage/damageController.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { EffectWeaponExtend } from "./effectWeapon.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class DarkEnergyEffectWeapon{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                EffectWeaponExtend
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