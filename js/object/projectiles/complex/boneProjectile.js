import { InheritController } from "../../../generalUtils/inherit.js"
import { BasicWithLifeProjectile } from "../basic/basicWithLifeProjectile.js"

export class BoneProjectile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicWithLifeProjectile
            ],
            build
        )

        this.graphicID = "bone"

        this.maxLife = 10

        this.width = 8
        this.height = 8

        this.defense = 4
        this.damage = 15

        this.lifeTime = 100

    }

    passBuildList = {

        "BoneProjectile_life": (updateThis) => {
            updateThis.life.set(100)
        },

    }

}