import { InheritController } from "../../../../generalUtils/inherit.js"
import { GuidedLaserProjectile } from "./guidedLaserProjectile.js"

export class BigGuidedLaserProjectile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                GuidedLaserProjectile
            ],
            build
        )

        this.width *= 4
        this.height *= 4

        this.damage *= 2

    }

}