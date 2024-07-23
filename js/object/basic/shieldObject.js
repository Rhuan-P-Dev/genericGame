import { InheritController } from "../../generalUtils/inherit.js"
import { Object } from "./object.js"

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

            insertRelativeTo(
                updateThis.damageOrder.physical,
                "life",
                "shield",
                "before"
            )
    
        }

    }

}