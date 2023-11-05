
import { FocusedTopDownBehavior } from "../../../../AI/behavior/focusedTopDownBehavior.js"
import { InheritController } from "../../../../generalUtils/inherit.js"
import { WeaponsModifiersController } from "../../modifiers/weaponsModifiersController.js"
import { WeaponsController } from "../../weaponsController.js"
import { EffectsWeapon } from "../weapon_extend/effectsWeapon.js"
import { HomingWeapon } from "../weapon_extend/homingWeapon.js"
import { Weapon } from "../weapon_extend/weapon.js"

var Weapons = ""
var WeaponsModifiers = ""

onInit(function(){

    Weapons = new WeaponsController()
    WeaponsModifiers = new WeaponsModifiersController()

})

export class M1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                //EffectsWeapon,
                Weapon,
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
        this.config = {
            multVel: 2,
            damageMult: 1,
        }
        this.lifeTime = 200
        this.baseFunc = Weapons.createMissile

    }

    modifiersList = ["burst"]

    build(){

        for (let index = 0; index < this.modifiersList.length; index++) {

            WeaponsModifiers.addModifier(this, this.modifiersList[index])
            
        }

    }

}