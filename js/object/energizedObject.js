import { Object } from "./object.js"

export class EnergizadObject extends Object {

    energy = undefined
    maxEnergy = undefined
    energyRegen = undefined

    constructor(
            energy = 500,
            maxEnergy = 500,
            energyRegen = 0.3,
        ){
            super()
            this.energy = energy
            this.maxEnergy = maxEnergy
            this.energyRegen = energyRegen
    }

}