import { InheritController } from "../../generalUtils/inherit.js"
import { ConsumeStatsController } from "../../misc/consumeStatsController.js"
import { Object } from "./object.js"

var ConsumeStats = ""

onInit(function(){

    ConsumeStats = new ConsumeStatsController()

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

            ConsumeStats.add(
                updateThis,
                "shield",
                [
                    "last",
                    0
                ]
            )
    
        }

    }

}