import { InheritController } from "../../../../generalUtils/inherit.js"
import { WeaponExtend } from "../extend/weapon.js"

export class ML1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                WeaponExtend
            ],
            build
        )

    }

    name = "ML1"
    cost = 50
    reload = 1*60

    currentVelMult = 0

    config = {

        weapon: {
            multVel: 0,
            damageMult: 1,
        },

        projectiles: {

            return: ["simple mine"],

            AI: {
                //0: ["missileV1"]
            }
            

        }

    }
    
    lifeTime = 10*60

}