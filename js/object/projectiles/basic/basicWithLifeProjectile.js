
import { InheritController } from "../../../generalUtils/inherit.js"
import { Object } from "../../basic/object.js"

export class BasicWithLifeProjectile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Object
            ],
            build
        )

        this.priority -= 1
        
    }

    passBuildList = {
        "remove_death animation": (updateThis) => {
            updateThis.onDeath.remove("last",11)
        }
    }

}