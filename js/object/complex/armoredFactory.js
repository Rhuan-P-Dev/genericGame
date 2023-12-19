import { InheritController } from "../../generalUtils/inherit.js"
import { ShieldObject } from "../basic/shieldObject.js"
import { ObjectFactory } from "./factory.js"

export class ArmoredObjectFactory{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                ObjectFactory,
                ShieldObject
            ],
            build
        )

        this.life *= 2
        this.maxLife *= 2

        this.defense += 5

        this.width -= 1
        this.height -= 1

        this.energy *= 0.8
        this.maxEnergy *= 0.8
        this.energyRegen *= 0.8

        this.damage *= 1.2

    }

}