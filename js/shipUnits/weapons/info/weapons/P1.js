
import { ModifiersLinkedList, WeaponsModifiersController } from "../../modifiers/weaponsModifiersController.js"
import { WeaponsController } from "../../weaponsController.js"
import { Weapon } from "../weapon_extend/weapon.js"

var Weapons = ""
var WeaponsModifiers = ""

onInit(function(){

    Weapons = new WeaponsController()
    WeaponsModifiers = new WeaponsModifiersController()

})

export class P1 extends Weapon {

    constructor(){
        
        super()

        this.name = "P1"
        this.cost = 5
        this.type = "???"
        this.reload = 7
        this.reloadTemp = 0
        this.reloadStep = 1
        this.config = {
            multVel: 8,
            damageMult: 1,
        }
        this.lifeTime = 30

        this.func = WeaponsModifiers.useModifier
        this.hasModifier = true
        this.baseFunc = Weapons.createShoot

        this.modifiers = new ModifiersLinkedList()

    }

    modifiersList = ["spread"]

    build(){

        for (let index = 0; index < this.modifiersList.length; index++) {

            WeaponsModifiers.addModifier(this, this.modifiersList[index])
            
        }

    }


}