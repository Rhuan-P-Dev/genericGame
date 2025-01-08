import { InheritController } from "../../../../../generalUtils/inherit.js"
import { ChessBishop } from "../../../../../object/complex/special drone/chessBishop.js"
import { CallChessTower } from "./callChessTower.js"

export class CallChessBishop {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                CallChessTower,
            ],
            build
        )

        this.config.objectClass = ChessBishop

    }

    name = "call chess bishop"

}