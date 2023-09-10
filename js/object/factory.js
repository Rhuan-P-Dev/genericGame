
import { FocusedTopDownBehavior } from "../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../generalUtils/inherit.js"
import { EnergizadObject } from "./basic/energizedObject.js"
import { Turret } from "./turrent.js"

export class BaseObjectFactory{

    constructor(){

         

        new InheritController().inherit(
            this,
            [
                EnergizadObject,
                FocusedTopDownBehavior,
            ]
        )

    }

    priority = 4
    
    life = 50
    maxLife = 50

    defense = 0
    resistance = 1

    width = 8
    height = 8

    energy = 300
    maxEnergy = 300
    energyRegen = 0.3

}