
import { DamageController } from "../../damage/damageController.js"
import { MissileDamage } from "../../damage/damageTypes/missile.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { MovableObject } from "../basic/movableObject.js"
import { RotableObject } from "../basic/rotableObject.js"
import { BasicProjetile } from "./basicProjetile.js"

export class MissileProjetile {

    constructor(){

        new InheritController().inherit(
            this,
            [
                MissileDamage,
                BasicProjetile,
                RotableObject,
                MovableObject,
            ]
            
        )

        this.onHit.remove("last",10) // damage

        this.damage = 30

        this.width = 3
        this.height = 3

        this.maxVel *= 1.5
        this.vel *= 2

        this.maxLife = 15
        this.life = 15

        this.onDeath.add(missileDeath,"last",0)

    }

}

function missileDeath(params){

    new DamageController().radiusCalc(
        params.object
    )

}