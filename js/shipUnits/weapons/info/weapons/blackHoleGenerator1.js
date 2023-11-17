
import { InheritController } from "../../../../generalUtils/inherit.js"
import { WeaponExtend } from "../extend/weapon.js"

export class BlackHoleGenerator1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                WeaponExtend
            ],
            build
        )

        this.name = "black hole generator 1"
        this.cost = 100
        this.reload = 20*60

        this.lifeTime = 250

        this.config = {

            weapon: {
                multVel: 1,
                damageMult: 1,
            },
    
            projectiles: {
    
                return: ["black hole"],
    
                AI: {
                    //0: ["missileV1"]
                }
                
    
            }
    
        }
    
    }

}