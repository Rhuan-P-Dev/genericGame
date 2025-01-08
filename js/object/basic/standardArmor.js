import { InheritController } from "../../generalUtils/inherit.js"
import { CommonImport } from "../common/commonImport.js"

import { DamageController } from "../../damage/damageController.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class StandardArmor {

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

        "add_standard_armor": (updateThis) => {

            Damage.addDefense(updateThis, "life", "shock", 1.5)
            Damage.addDefense(updateThis, "life", "fire", 0.25)
            Damage.addDefense(updateThis, "life", "parasite self blaster", 0.1)
            Damage.addDefense(updateThis, "life", "parasite blaster", 0.5)
            Damage.addDefense(updateThis, "life", "laser", 0.3)
            Damage.addDefense(updateThis, "life", "snow", 1)

        }

    }

}