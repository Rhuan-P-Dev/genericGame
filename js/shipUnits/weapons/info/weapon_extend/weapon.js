
import { InheritController } from "../../../../generalUtils/inherit.js"
import { Rotable } from "../../../../object/basic/rotable.js"
import { BasicActivate } from "../../../forAllShipUnits/basicActivate.js"
import { WeaponsModifiersController } from "../../modifiers/weaponsModifiersController.js"

var WeaponsModifiers = ""

onInit(function(){

    WeaponsModifiers = new WeaponsModifiersController()

})

export class Weapon{


    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Rotable,
                BasicActivate
            ],
            build
        )

    }

    type = "weapon"

    xOffset = 0//randomInteger(-200,200)
    yOffset = 0//randomInteger(-200,200)

    reloadTemp = 0
    reloadStep = 1

    buildAngle = 0

    range = 180

    hasModifier = false

    weaponConfig = {
        multVel: 3,
        damageMult: 1,
    }
    lifeTime = 180
    func = undefined

    calcStats(){

        this.range = this.lifeTime * this.weaponConfig.multVel

    }

    modifiersList = []

    build(){

        for (let index = 0; index < this.modifiersList.length; index++) {

            WeaponsModifiers.addModifier(this, this.modifiersList[index])
            
        }

    }

}