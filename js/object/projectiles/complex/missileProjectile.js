
import { InheritController } from "../../../generalUtils/inherit.js"
import { MovableObject } from "../../basic/movableObject.js"
import { RotableObject } from "../../basic/rotableObject.js"
import { BasicExplosiveProjectile } from "../basic/basicExplosiveProjectile.js"

export class MissileProjetile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicExplosiveProjectile,
                RotableObject,
                MovableObject,
            ],
            build
        )

        this.damage = 30

        this.width = 3
        this.height = 3

        this.vel *= 10

        this.maxLife = 15
        this.life = 15

        this.rotationVel *= 4

        this.lifeTime = 100

    }

}