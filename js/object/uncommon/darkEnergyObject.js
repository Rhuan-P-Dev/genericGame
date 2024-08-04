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

        Damage.addDamage(this, "dark energy", 0.1)

        Damage.addDefense(this, "life", "dark energy", 0.1)

    }

}