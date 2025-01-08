import { InheritController } from "../../generalUtils/inherit.js"
import { DamageController } from "../../damage/damageController.js"
import { CommonImport } from "../common/commonImport.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class RemnantResistance {

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

        "add_Remnant": (updateThis) => {

            updateThis.lifeRegen += 1/60

            updateThis.addWeaponObserver.add(
                (weapon) => {

                    Damage.addDamage(
                        weapon,
                        "agony",
                        0.1
                    )

                }
            )

            Damage.addDamage(
                updateThis,
                "agony",
                1,
            )

            Damage.addDefense(
                updateThis,
                "life",
                "fire",
                -0.1
            )

            Damage.addDefense(
                updateThis,
                "shield",
                "fire",
                -0.1
            )

            Damage.addDefense(
                updateThis,
                "life",
                "physical",
                0.1
            )

            Damage.addDefense(
                updateThis,
                "life",
                "shock",
                0.1
            )

            Damage.addDefense(
                updateThis,
                "life",
                "death",
                0.5
            )

            Damage.addDefense(
                updateThis,
                "life",
                "revenge",
                -0.1
            )

            Damage.addDefense(
                updateThis,
                "life",
                "parasite blaster",
                0.1
            )

            Damage.addDefense(
                updateThis,
                "shield",
                "physical",
                0.1
            )

            Damage.addDefense(
                updateThis,
                "shield",
                "shock",
                0.1
            )

            Damage.addDefense(
                updateThis,
                "shield",
                "parasite blaster",
                0.1
            )
            
            Damage.addDefense(
                updateThis,
                "life",
                "snow",
                0.5
            )

        },

    }

}