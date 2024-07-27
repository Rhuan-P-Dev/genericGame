import { InheritController } from "../../generalUtils/inherit.js"
import { Object } from "./object.js"
import { DamageController } from "../../damage/damageController.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class ShieldObject {

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

    shield = 50
    maxShield = 50
    shieldRegen = 1 / (1 * 60)

    passBuildList = {

        "add_shieldConsume": (updateThis) => {

            Damage.addDamageOrder(
                updateThis,
                "dark energy",
                "shield",
                "before",
                "life",
            )

            Damage.addDamageOrder(
                updateThis,
                "physical",
                "shield",
                "before",
                "life",
            )

            Damage.addDamageOrder(
                updateThis,
                "fire",
                "shield",
                "before",
                "life",
            )

            Damage.addDamageOrder(
                updateThis,
                "parasite blaster",
                "shield",
                "before",
                "life",
            )

            Damage.addDamageOrder(
                updateThis,
                "shock",
                "shield",
                "before",
                "life",
            )

            Damage.addDefense(updateThis, "shield", "physical", 0.25, true)
            Damage.addDefense(updateThis, "shield", "fire", 2, true)

        }

    }

}