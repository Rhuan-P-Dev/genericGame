
import { FocusedTopDownBehavior } from "../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { EnergizadObject } from "../basic/energizedObject.js"

export class BaseObjectFactory{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                EnergizadObject,
                FocusedTopDownBehavior,
            ],
            build
        )

        this.priority = 4
    
        this.life = 50
        this.maxLife = 50

        this.defense = 0
        this.resistance = 1

        this.width = 8
        this.height = 8

        this.energy = 300
        this.maxEnergy = 300
        this.energyRegen = 0.6

        this.damage = 10

    }

}