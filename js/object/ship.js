import { InheritController } from "../generalUtils/inherit.js"
import { EnergizadObject } from "./energizedObject.js"
import { MovableObject } from "./movableObject.js"
import { RotableObject } from "./rotableObject.js"

export class Ship {

    prioritys = {
        priority: 5,
        targetPriority: undefined,
        above: undefined,
        nothing: undefined,
    }

    constructor(){

        new InheritController().inherit(
            this,
            [
                EnergizadObject,
                RotableObject,
                MovableObject
            ]
        )

        this.typeOfObject = "Ship"

    }

}