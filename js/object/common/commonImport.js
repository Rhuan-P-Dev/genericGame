import { InheritController } from "../../generalUtils/inherit.js"
import { SelfBuild } from "./selfBuild.js"

export class CommonImport {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SelfBuild
            ],
            build
        )

    }

}