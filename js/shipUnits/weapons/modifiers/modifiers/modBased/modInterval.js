import { Mod } from "./mod.js"

export class ModInterval extends Mod {

    interval = undefined

    constructor(
        interval = 150
    ){

        super()

        this.interval = interval

    }

}