import { InheritController } from "../../generalUtils/inherit.js"
import { Object } from "./object.js"
import { ShieldIntermediary } from "./shieldIntermediary.js"

export class ShieldObject {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                ShieldIntermediary,
                Object
            ],
            build
        )

        this.priority += 1

    }

}