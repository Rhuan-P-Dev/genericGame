import { InheritController } from "../../generalUtils/inherit.js"
import { Object } from "../basic/object.js"
import { SelfSwarmIntermediary } from "./selfSwarmIntermediary.js"

export class SelfSwarmObject {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SelfSwarmIntermediary,
                Object,
            ],
            build
        )

        this.priority += 1

    }

}