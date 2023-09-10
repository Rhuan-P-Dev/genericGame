
import { InheritController } from "../../generalUtils/inherit.js"
import { Object } from "./object.js"
import { Rotable } from "./rotable.js"

export class RotableObject {

    constructor(){

         
        
        new InheritController().inherit(
            this,
            [
                Rotable,
                Object
            ]
        )

        this.priority += 1

    }


}