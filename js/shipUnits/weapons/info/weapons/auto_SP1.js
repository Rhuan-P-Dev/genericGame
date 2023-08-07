
import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { AutoWeapon } from "../weapon_extend/autoWeapon.js"
import { SP1 } from "./SP1.js"

export class Auto_SP1{

    constructor(){
        
        new InheritController().inherit(
            this,
            [
                AutoWeapon,
                FocusedTopDownBehavior,
                SP1,
            ]
        )

        this.name = "auto_SP1"

        this.cost /= 3
        this.config.damageMult /= 2
        this.config.multVel /= 2

    }

}