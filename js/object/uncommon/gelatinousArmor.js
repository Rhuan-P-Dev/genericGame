import { DamageController } from "../../damage/damageController.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { CommonImport } from "../common/commonImport.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class GelatinousArmor {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                CommonImport
            ],
            build
        )

    }

    passBuildList = {

        "add_Gelatinous_Armor": (updateThis) => {

            updateThis.defense *= 1.1
            updateThis.resistance *= 0.99

            updateThis.maxLife *= 1.5
            updateThis.lifeRegen += (updateThis.maxLife*0.01)/60

            Damage.addDefense(updateThis, "life", "physical", 1)
            Damage.addDefense(updateThis, "life", "shock", 1)
            Damage.addDefense(updateThis, "life", "fire", 2)
            Damage.addDefense(updateThis, "life", "parasite self blaster", 1)
            Damage.addDefense(updateThis, "life", "parasite blaster", 1)
            Damage.addDefense(updateThis, "life", "parasite suck energy", 1)
            Damage.addDefense(updateThis, "life", "self swarm", 0.5)
            Damage.addDefense(updateThis, "life", "self swarm production", 0.5)

            Damage.addDefense(updateThis, "life", "laser", -0.01)
            Damage.addDefense(updateThis, "life", "ink", -0.05)

            Damage.addDefense(updateThis, "life", "snow", 2)

        }

    }

}