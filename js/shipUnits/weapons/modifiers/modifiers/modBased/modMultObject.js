import { Mod } from "./mod.js"

export class ModMultObject extends Mod {

    quantity = undefined

    constructor(
        quantity = 10
    ){

        super()

        this.quantity = quantity

    }

}