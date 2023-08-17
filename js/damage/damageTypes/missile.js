import { RadiusDamage } from "./radius.js"


export class MissileDamage extends RadiusDamage {

    constructor(){
        
        super()

        this.damageConfig.scheduler = "linearReverse"

    }

}

