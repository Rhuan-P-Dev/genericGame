import { Object } from "./object.js"

export class EnergizadObject extends Object {

    energy = 500
    maxEnergy = 500
    energyRegen = 0.3

    prioritys = {
        priority: 1,
        targetPriority: undefined,
        above: undefined,
        nothing: undefined,
    }

    constructor(){

        super()

        this.typeOfObject = "EnergizadObject"
        
    }

}