import { InheritController } from "../../generalUtils/inherit.js"
import { Object } from "../basic/object.js"
import { DarkEnergyIntermediary } from "./darkEnergyIntermediary.js"

export class DarkEnergyObject {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DarkEnergyIntermediary,
                Object
            ],
            build
        )

        this.priority += 1

    }

}