
import { InheritController } from "../../generalUtils/inherit.js"
import { EnergizedObject } from "../basic/energizedObject.js"

export class StationaryObject {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                EnergizedObject,
            ],
            build
        )

        this.priority += 1

        this.life = 100
        this.maxLife = 100

        this.defense = 2
        this.resistance -= 0.02

        this.width += 2
        this.height += 2

        this.energy = 100
        this.maxEnergy = 100
        this.energyRegen = 0.5

        this.damage = 2

    }

}