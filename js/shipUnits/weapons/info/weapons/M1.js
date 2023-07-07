
import { ModifiersLinkedList, WeaponsModifiersController } from "../../modifiers/weaponsModifiersController.js"
import { WeaponsController } from "../../weaponsController.js"
import { Weapon } from "../weapon_extend/weapon.js"

var Weapons = ""
var WeaponsModifiers = ""

onInit(function(){

    Weapons = new WeaponsController()
    WeaponsModifiers = new WeaponsModifiersController()

})

export class M1 extends Weapon {

    prioritys = {
        priority: 0,
        targetPriority: 5,
        above: false,
        below: false,
        ifDontHave: {
            first: -1,
            all: false,
        },
    }

    constructor(){
        
        super()

        this.name = "M1"
        this.cost = 10
        this.type = "???"
        this.reload = 60
        this.reloadTemp = 0
        this.reloadStep = 1
        this.config = {
            multVel: 2,
            damageMult: 1,
        }
        this.lifeTime = 200

        this.func = WeaponsModifiers.useModifier
        this.hasModifier = true
        this.baseFunc = Weapons.createMissile

        this.modifiers = new ModifiersLinkedList()

    }

    modifiersList = ["burst"]

    build(){

        for (let index = 0; index < this.modifiersList.length; index++) {

            WeaponsModifiers.addModifier(this, this.modifiersList[index])
            
        }

    }

}