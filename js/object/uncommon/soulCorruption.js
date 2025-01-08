import { DamageController } from "../../damage/damageController.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { CommonImport } from "../common/commonImport.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class SoulCorruption {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                CommonImport,
            ],
            build
        )

    }

    passBuildList = {

        "add_SoulCorruption_special": (updateThis) => {

            Damage.addDamage(
                updateThis,
                "corruption",
                0.5,
            )

            Damage.immunityTo(updateThis, "corruption")

            updateThis.addWeaponObserver.add(
                (weapon) => {
                    Damage.addDamage(
                        weapon,
                        "corruption",
                        0.1,
                    )
                }
            )

        },

    }

}