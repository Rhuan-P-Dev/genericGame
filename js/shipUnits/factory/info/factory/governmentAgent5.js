import { InheritController } from "../../../../generalUtils/inherit.js"
import { GovernmentAgent4 } from "./governmentAgent4.js"

export class GovernmentAgent5 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                GovernmentAgent4,
            ],
            build
        )

        this.name = "government agent 5"
        this.cost *= 1.25
        this.reload *= 1.25

        this.config.activates.weapon.push("random")
        this.config.activates.defense.push("random")
        this.config.activates.factory.push("random")
        this.config.activates.special.push("random")

        this.config.statsMult += 0.1
        this.config.statsMult *= 1.1

    }

}