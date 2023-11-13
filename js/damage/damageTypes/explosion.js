import { RadiusDamage } from "./radius.js"


export class ExplosionDamage extends RadiusDamage {

    constructor(){
        
        super()

        this.damageConfig.scheduler = "linearReverse"

    }

}