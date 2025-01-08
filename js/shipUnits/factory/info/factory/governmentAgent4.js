import { InheritController } from "../../../../generalUtils/inherit.js"
import { GovernmentAgent3 } from "./governmentAgent3.js"

export class GovernmentAgent4 {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                GovernmentAgent3,
            ],
            build
        )

        this.name = "government agent 4"
        this.cost *= 1.25
        this.reload *= 1.25

        if(!this.config.activates.factory){
            this.config.activates.factory = []
        }

        this.config.activates.weapon.push("random")
        this.config.activates.factory.push("movable safer perimeter 1")

        this.config.statsMult += 0.1
        this.config.statsMult *= 1.1

    }

}