import { InheritController } from "../../../../../generalUtils/inherit.js"
import { ChessHorse } from "../../../../../object/complex/special drone/chessHorse.js"
import { CallChessPawn } from "./callChessPawn.js"


export class CallChessHorse {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                CallChessPawn,
            ],
            build
        )

        this.config.objectClass = ChessHorse

    }

    name = "call chess horse"
    cost = 2

}