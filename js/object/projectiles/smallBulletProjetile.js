
import { BasicProjetile } from "./basicProjetile.js"

export class SmallBulletProjetile extends BasicProjetile {

    constructor(){

        super()

        this.typeOfObject = "SmallBulletProjetile"

        this.priority -= 1

        this.life = 1
        this.maxLife = 1

        this.damage = 10

        this.width = 2
        this.height = 2

    }

}