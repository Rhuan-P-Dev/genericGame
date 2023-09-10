import { Object } from "./object.js"

export class EnergizadObject extends Object {

    energy = 10
    maxEnergy = 10
    energyRegen = 0.01

    constructor(){

        super()

         

        this.priority += 1
        
    }

}