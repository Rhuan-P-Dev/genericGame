import { InheritController } from "../../generalUtils/inherit.js"
import { Object } from "./object.js"
import { DamageController } from "../../damage/damageController.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class EnergizedObject {

    energy = 10
    maxEnergy = 10
    energyRegen = 0.01

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Object,
            ],
            build
        )

        this.priority += 1
        
    }

    passBuildList = {

        "add_someEnergyConsume": (updateThis) => {

            Damage.addDamageOrder(
                updateThis,
                "parasite blaster",
                "energy",
                "after",
                "life",
            )

            Damage.addDamageOrder(
                updateThis,
                "parasite suck energy",
                "energy",
                "before",
                "life",
            )

        }

    }

}