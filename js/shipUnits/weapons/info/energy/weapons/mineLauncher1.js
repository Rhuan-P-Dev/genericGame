import { InheritController } from "../../../../../generalUtils/inherit.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class MineLauncher1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                WeaponExtend
            ],
            build
        )

        this.name = "mine launcher 1"
        this.cost = 50
        this.reload = 1*60

        this.currentVelMult = 0

        this.lifeTime = 10*60

        this.config.weapon.multVel = 0

        this.config.projectiles.objectClass = ["simple mine"]

    }

}