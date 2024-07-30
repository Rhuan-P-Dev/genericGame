
import { InheritController } from "../../../../../generalUtils/inherit.js"
import { WeaponExtend } from "../../extend/weapon.js"

export class Shotgun1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                WeaponExtend
            ],
            build
        )

        this.name = "shotgun 1"
        this.cost = 45
        this.reload = 60

        this.config.weapon.multVel = 8

        this.lifeTime = 20

        this.config.projectiles.objectClass = [
            "small bullet",
            "small bullet",
            "small bullet",
            "small bullet",
            "small bullet",
            "small bullet",
            "small bullet",
            "small bullet",
            "small bullet"
        ],

        this.modifiersList = ["mid widen","distortion"]

    }

}