
import { DamageController } from "../../damage/damageController.js"
import { RadiusDamage } from "../../damage/damageTypes/radius.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { MovableObject } from "../basic/movableObject.js"
import { RotableObject } from "../basic/rotableObject.js"
import { BasicProjetile } from "./basicProjetile.js"

export class MissileProjetile {

    constructor(){

        new InheritController().inherit(
            this,
            [
                BasicProjetile,
                RotableObject,
                MovableObject,
                RadiusDamage,
            ]
        )

        this.typeOfObject = "MissileProjetile"

        this.damage = 30

        this.width = 3
        this.height = 3

        this.maxVel *= 1.5
        this.vel *= 2

        this.maxLife = 15
        this.life = 15

        this.onDeathFunctions.add(missileDeath)

        this.onHitFunctions.add(removeMissileDeath)

    }

}

function missileDeath(data){

    new DamageController().radiusCalc(
        data.object
    )

}

function removeMissileDeath(data){

    data.object.onDeathFunctions.remove(missileDeath.name)

}