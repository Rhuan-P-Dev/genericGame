
import { TopDownBehavior } from "../../../../AI/behavior/topDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { AutoWeapon } from "../weapon_extend/autoWeapon.js"
import { P1 } from "./P1.js"

export class Auto_P1{

    constructor(){
        
        new InheritController().inherit(
            this,
            [
                AutoWeapon,
                TopDownBehavior,
                P1,
            ]
        )

        this.name = "auto_P1"

        this.cost /= 3
        this.config.damageMult /= 2
        this.config.multVel /= 2

    }

}