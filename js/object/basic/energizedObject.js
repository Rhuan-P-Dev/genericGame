import { InheritController } from "../../generalUtils/inherit.js"
import { EnergizedIntermediary } from "./energizedIntermediary.js"
import { Object } from "./object.js"

export class EnergizedObject {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Object,
                EnergizedIntermediary
            ],
            build
        )

        this.priority += 1

    }

}