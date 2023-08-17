import { SingleDamage } from "./single.js"

export class RadiusDamage extends SingleDamage {

    constructor(){

        super()

        this.damageConfig.type = "radius"
        this.damageConfig.range = 25
        this.damageConfig.scheduler = "uniform"


    }

}