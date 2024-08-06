import { InheritController } from "../../generalUtils/inherit.js"
import { Object } from "../basic/object.js"
import { DamageController } from "../../damage/damageController.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class DarkEnergyObject {

    darkEnergy = 100
    maxDarkEnergy = 100
    darkEnergyRegen = 0.001

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Object
            ],
            build
        )

        this.priority += 1

    }

    passBuildList = {

        "add_dark_energy_damage_defense": (updateThis) => {

            Damage.addDamage(updateThis, "dark energy", 0.1)
            Damage.addDefense(updateThis, "life", "dark energy", 0.1)

        },

    }

}