
import { InheritController } from "../../../../generalUtils/inherit.js"
import { WeaponsModifiersController } from "../../modifiers/weaponsModifiersController.js"
import { WeaponsController } from "../../weaponsController.js"
import { Weapon } from "../weapon_extend/weapon.js"

var Weapons = ""
var WeaponsModifiers = ""

onInit(function(){

    Weapons = new WeaponsController()
    WeaponsModifiers = new WeaponsModifiersController()

})

export class BHG1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                Weapon
            ],
            build
        )

        this.name = "BHG1"
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
    
        this.func = Weapons.returnProjectiles

    }

}