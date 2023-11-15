
import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { EffectsWeapon } from "../extend/effectsWeapon.js"
import { HomingWeapon } from "../extend/homingWeapon.js"
import { WeaponExtend } from "../extend/weapon.js"

export class M1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                //EffectsWeapon,
                WeaponExtend,
                FocusedTopDownBehavior,
                HomingWeapon,
            ],
            build
        )

        this.name = "M1"
        this.cost = 10
        this.reload = 60
        this.reloadTemp = 0
        this.reloadStep = 1
        this.lifeTime = 200

        this.config = {

            weapon: {
                multVel: 2,
                damageMult: 1,
            },
    
            projectiles: {
    
                return: ["simple missile"],
    
                AI: {
                    0: ["missileV1"]
                }
                
    
            }
    
        }
    
    }

    modifiersList = ["burst"]

}