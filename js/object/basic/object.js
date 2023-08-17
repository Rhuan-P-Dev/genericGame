import { DamageController } from "../../damage/damageController.js"
import { SingleDamage } from "../../damage/damageTypes/single.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { ActivateInstructions } from "./activateInstructions.js"
import { onInstructions } from "./onInstructions.js"

var Damage = ""

onInit(function(){

    Damage = new DamageController()

})

export class Object {

    constructor(){

        new InheritController().inherit(
            this,
            [
                ActivateInstructions,
                onInstructions,
                SingleDamage,
            ]
        )

        this.onHitOb.add({
            "func": "onHit",
            "class": this
        })

        this.onHitOb.add({
            "func": "damage",
            "class": Damage
        })

        this.onDamageOb.add({
            "func": "onDamage",
            "class": this
        })

        this.onDeathOb.add({
            "func": "onDeath",
            "class": this
        })
        
    }

    typeOfObject = "Object"

    team = "newTeam"
    ID = "newID"

    life = 10
    maxLife = 10
    lifeRegen = 0

    defense = 0
    resistance = 1

    damage = 0

    x = 10
    y = 10

    width = 2
    height = 2

    color = "black"

    currentXVel = 0
    currentYVel = 0

    priority = 0

    effects = {}

    onHitOb = new Obeserver()
    onDamageOb = new Obeserver()
    onDeathOb = new Obeserver()

}