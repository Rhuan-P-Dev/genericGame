import { InheritController } from "../../../../generalUtils/inherit.js"
import { DeathLaserProjectile } from "./deathLaserProjectile.js"

export class BigDeathLaserProjectile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DeathLaserProjectile
            ],
            build
        )

        this.width *= 4
        this.height *= 4

        this.damage *= 2

    }

}