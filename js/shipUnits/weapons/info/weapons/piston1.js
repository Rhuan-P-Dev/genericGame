
import { InheritController } from "../../../../generalUtils/inherit.js"
import { WeaponExtend } from "../extend/weapon.js"

export class Piston1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                WeaponExtend
            ],
            build
        )

    }

    name = "piston 1"
    cost = 5
    reload = 7

    config = {

        weapon: {
            multVel: 8,
            damageMult: 1,
        },

        projectiles: {

            return: ["small bullet"],

            AI: {
                //0: ["missileV1"]
            }
            

        }

    }
    
    lifeTime = 30

    modifiersList = ["spread","distortion"]

}