
import { InheritController } from "../../generalUtils/inherit.js"
import { BasicProjetile } from "./basicProjetile.js"

export class SmallBulletProjetile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicProjetile
            ],
            build
            
        )

        this.priority -= 1

        this.life = 1
        this.maxLife = 1

        this.damage = 10

        this.width = 2
        this.height = 2

    }

}