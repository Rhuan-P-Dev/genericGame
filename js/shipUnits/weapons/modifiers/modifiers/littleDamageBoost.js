import { InheritController } from "../../../../generalUtils/inherit.js"
import { ModLittleBoost } from "./modBased/modLittleBoost.js"

export class LittleDamageBoost {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                ModLittleBoost
            ],
            build
        )

    }

    name = "little damage boost"
    stat = "damage"

}