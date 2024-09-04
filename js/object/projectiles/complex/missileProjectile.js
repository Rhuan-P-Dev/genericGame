
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

        this.velDecay = 0.9

        this.graphicID = "missile"

        this.damage = 30

        this.width = 4
        this.height = 4

        this.vel *= 8
        this.maxVel *= 1.5

        this.maxLife = 5

        this.rotationVel *= 8

        this.lifeTime = 100

        this.energy *= 5
        this.maxEnergy *= 5

    }

    passBuildList = {

        "missileProjetile_life": (updateThis) => {
            updateThis.life.set(5)
        },

    }

}