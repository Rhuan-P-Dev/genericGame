import { InheritController } from "../../../../generalUtils/inherit.js"
import { GovernmentAgent1 } from "./governmentAgent1.js"

export class GovernmentAgent2 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                GovernmentAgent1,
            ],
            build
        )

        this.name = "government agent 2"
        this.cost *= 1.25
        this.reload *= 1.25

        this.config.activates.defense.push("random")
        this.config.statsMult += 0.1
        this.config.statsMult *= 1.1

    }

}