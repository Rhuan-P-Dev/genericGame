
import { InheritController } from "../../../../generalUtils/inherit.js"
import { DamageController } from "../../../../damage/damageController.js"
import { EffectWeaponExtend } from "./effectWeapon.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class ActionPointsWeapon{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                EffectWeaponExtend
            ],
            build
        )

        this.consumableStat = "actionPoints"

    }

}