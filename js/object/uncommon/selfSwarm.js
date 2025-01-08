import { InheritController } from "../../generalUtils/inherit.js"
import { DamageController } from "../../damage/damageController.js"
import { CommonImport } from "../common/commonImport.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class SelfSwarm {

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

        "add_self_swarm_damage_defense": (updateThis) => {

            Damage.addDamage(updateThis, "self swarm", 1)
            Damage.addDamage(updateThis, "self swarm production", 0.01)
            Damage.immunityTo(updateThis, "self swarm")
            Damage.immunityTo(updateThis, "self swarm production")

        },

    }

}