import { ExplosionDamage } from "./explosion.js"


export class MediumExplosionDamage extends ExplosionDamage {

    constructor(){
        
        super()

        this.damageConfig.range *= 4

    }

}