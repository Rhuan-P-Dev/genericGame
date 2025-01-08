import { InheritController } from "../../../../generalUtils/inherit.js"
import { ModLittleBoost } from "./modBased/modLittleBoost.js"

export class LittleMore {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                ModLittleBoost
            ],
            build
        )

    }

    name = "little more"
    stat = "lifeTime"

}