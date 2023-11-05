
import { InheritController } from "../../generalUtils/inherit.js"
import { Object } from "./object.js"
import { Rotable } from "./rotable.js"

export class RotableObject {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                Rotable,
                Object
            ],
            build
        )

        this.priority += 1

    }


}