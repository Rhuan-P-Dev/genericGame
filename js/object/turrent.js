
import { InheritController } from "../generalUtils/inherit.js"
import { EnergizadObject } from "./energizedObject.js"
import { RotableObject } from "./rotableObject.js"

export class Turret {

    prioritys = {
        priority: 3,
        targetPriority: undefined,
        above: undefined,
        nothing: undefined,
    }

    constructor(){
        
        new InheritController().inherit(
            this,
            [
                RotableObject,
                EnergizadObject
            ]
        )

        this.typeOfObject = "Turret"

    }


}