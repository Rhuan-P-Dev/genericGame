import { InheritController } from "../../generalUtils/inherit.js"
import { ShieldObject } from "../basic/shieldObject.js"
import { StandardArmor } from "../basic/standardArmor.js"
import { ObjectFactory } from "./factory.js"

export class ArmoredObjectFactory{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                ObjectFactory,
                ShieldObject,
                StandardArmor
            ],
            build
        )

        this.graphicID = "armored factory"

        this.maxLife *= 2

        this.defense += 5

        this.width -= 1
        this.height -= 1

        this.energy *= 0.8
        this.maxEnergy *= 0.8
        this.energyRegen *= 0.8

        this.damage *= 1.2

    }

    passBuildList = {

        "armoredObjectFactory_life": (updateThis) => {
            updateThis.life.math("*", 2)
        },

    }

}