
import { FocusedTopDownBehavior } from "../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { EnergizedObject } from "../basic/energizedObject.js"

export class ObjectFactory{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                EnergizedObject,
                FocusedTopDownBehavior,
            ],
            build
        )

        this.graphicID = "factory"

        this.priority = 5
    
        this.maxLife = 50

        this.defense = 0
        this.resistance = 1

        this.width = 16
        this.height = 16

        this.energy = 300
        this.maxEnergy = 300
        this.energyRegen = 0.6

        this.damage = 10

    }

    passBuildList = {

        "objectFactory_life": (updateThis) => {

            updateThis.life.set(50)
    
        }

    }

}