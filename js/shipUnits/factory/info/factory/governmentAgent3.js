import { InheritController } from "../../../../generalUtils/inherit.js"
import { GovernmentAgent2 } from "./governmentAgent2.js"

export class GovernmentAgent3 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                GovernmentAgent2,
            ],
            build
        )

        this.name = "government agent 3"
        this.cost *= 1.25
        this.reload *= 1.25

        if(!this.config.activates.special){
            this.config.activates.special = []
        }

        this.config.activates.special.push("random")

        this.config.statsMult += 0.1
        this.config.statsMult *= 1.1

    }

}