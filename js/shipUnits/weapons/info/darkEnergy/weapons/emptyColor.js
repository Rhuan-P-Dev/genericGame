
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { DarkEnergyWeapon } from "../../extend/darkEnergyWeapon.js"

export class EmptyColor {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                DarkEnergyWeapon
            ],
            build
        )

        this.name = "empty color"
        this.cost = 120
        this.reload = 35*60

        this.lifeTime = 450

        this.config.weapon.multVel = 6
        this.config.weapon.damageMult = 1

        this.config.projectiles.objectClass = ["empty color"]

        this.rotationVel *= 2

        this.range = 2400

    }

}