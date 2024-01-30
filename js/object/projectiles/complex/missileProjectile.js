
import { InheritController } from "../../../generalUtils/inherit.js"
import { EnergizedObject } from "../../basic/energizedObject.js"
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
                EnergizedObject,
            ],
            build
        )

        this.graphicID = "missile - P3"

        this.damage = 30

        this.width = 3
        this.height = 3

        this.vel *= 10

        this.maxLife = 5
        this.life = 5

        this.rotationVel *= 4

        this.lifeTime = 100

        this.energy *= 5
        this.maxEnergy *= 5

    }

}