import { InheritController } from "../../../../../generalUtils/inherit.js"
import { ChessTower } from "../../../../../object/complex/special drone/chessTower.js"
import { CallChessPawn } from "./callChessPawn.js"


export class CallChessTower {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                CallChessPawn,
            ],
            build
        )

        this.config.objectClass = ChessTower

    }

    name = "call chess tower"
    cost = 3

}