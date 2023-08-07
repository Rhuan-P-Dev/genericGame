import { Mod } from "./mod.js"

export class ModCumulative extends Mod {

    value = undefined
    valueStep = undefined
    valueBase = undefined
    callBackFunction = undefined

    constructor(
        value = 0,
        valueStep = 0.1,
        valueBase = 0,
    ){

        super()

        this.value = value
        this.valueStep = valueStep
        this.valueBase = valueBase

    }

}