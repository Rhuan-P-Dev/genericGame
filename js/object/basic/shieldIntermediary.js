import { InheritController } from "../../generalUtils/inherit.js"
import { Object } from "./object.js"
import { DamageController } from "../../damage/damageController.js"
import { CommonImport } from "../common/commonImport.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class ShieldIntermediary {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                CommonImport
            ],
            build
        )

    }

    shield = 50
    maxShield = 50
    shieldRegen = 1 / (1 * 60)

    damageOrderList = [
        "dark energy",
        "physical",
        "fire",
        "parasite blaster",
        "shock",
        "self swarm",
        "agony",
        "surprise attack",
        "laser",
        "ink",
        "snow"
    ]

    passBuildList = {

        "add_shieldConsume": (updateThis) => {

            Damage.addDamageOrder(
                updateThis,
                "self swarm production",
                "shield",
                "before",
                "lifeRegen",
            )

            for (
                let index = 0;
                index < this.damageOrderList.length;
                index++
            ) {

                Damage.addDamageOrder(
                    updateThis,
                    this.damageOrderList[index],
                    "shield",
                    "before",
                    "life",
                )

            }

            Damage.addDefense(updateThis, "shield", "physical", 0.25)
            Damage.addDefense(updateThis, "shield", "fire", 2)
            Damage.addDefense(updateThis, "shield", "self swarm", 0.9)
            Damage.addDefense(updateThis, "shield", "self swarm production", 1000)
            Damage.addDefense(updateThis, "shield", "laser", 0.05)
            Damage.addDefense(updateThis, "shield", "snow", 1)

            Damage.addDamageOrder(
                updateThis,
                "corruption",
                "maxShield",
                "before",
                "maxLife",
            )

        }

    }

}