import { InheritController } from "../../../../generalUtils/inherit.js"
import { LaserProjectile } from "./laserProjectile.js"

export class BigLaserProjectile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                LaserProjectile
            ],
            build
        )

        this.width *= 4
        this.height *= 4

        this.damage *= 2

    }

}