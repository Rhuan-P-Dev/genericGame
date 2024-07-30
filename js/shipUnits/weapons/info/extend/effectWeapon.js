
import { InheritController } from "../../../../generalUtils/inherit.js"
import { WeaponsController } from "../../weaponsController.js"
import { BasicWeaponExtend } from "./basicWeapon.js"

var Weapons

onInit(function(){

    Weapons = new WeaponsController()

})

export class EffectWeaponExtend{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicWeaponExtend
            ],
            build
        )

    }

    func = Weapons.activateEffect

}