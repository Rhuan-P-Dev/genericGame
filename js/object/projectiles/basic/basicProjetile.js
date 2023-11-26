
import { InheritController } from "../../../generalUtils/inherit.js"
import { Object } from "../../basic/object.js"

export class BasicProjetile {

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
        ["add_" + selfDestruction.name]: (updateThis) => {
            updateThis.onHit.add(selfDestruction, "last", 0)
        }
    }

}

function selfDestruction(params){

    params.object.onDeath.run({
        "object": params.object
    })
    
}