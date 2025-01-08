import { InheritController } from "../../../../generalUtils/inherit.js"
import { FastLaserSentinel } from "./fastLaserSentinel.js"

export class BigLaserSentinel {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                FastLaserSentinel,
            ],
            build
        )

        this.config.activates.weapon = ["big laser"]

    }

    name = "big laser sentinel"


}