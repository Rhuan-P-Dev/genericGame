import { InheritController } from "../../generalUtils/inherit.js"
import { DamageController } from "../../damage/damageController.js"
import { CommonImport } from "../common/commonImport.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class EnergizedIntermediary {

    energy = 10
    maxEnergy = 10
    energyRegen = 0.01

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