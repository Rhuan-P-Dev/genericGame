import { DamageController } from "../../damage/damageController.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { CommonImport } from "../common/commonImport.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class CombatShrewd {

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

        "CombatShrewd_special": (updateThis) => {

            Damage.addDamage(
                updateThis,
                "surprise attack",
                0.25,
            )

            Damage.addDefense(
                updateThis,
                "life",
                "surprise attack",
                0.25
            )

           Damage.addDefense(
                updateThis,
                "shield",
                "surprise attack",
                0.1
            )

            updateThis.addWeaponObserver.add(
                (weapon) => {
                    Damage.addDamage(
                        weapon,
                        "surprise attack",
                        0.1
                    )
                }
            )

        },

    }

}