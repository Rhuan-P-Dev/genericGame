import { InheritController } from "../../generalUtils/inherit.js"
import { Object } from "./object.js"

export class EnergizadObject {

    energy = 10
    maxEnergy = 10
    energyRegen = 0.01

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

}