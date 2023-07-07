
export class Mod {

    name = undefined

    costMult = undefined

    func = undefined

    constructor(
        name = undefined,
        costMult = 1,
        func = undefined,
    ){
        this.name = name
        this.costMult = costMult
        this.func = func
    }

}