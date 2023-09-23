import { DamageController } from "../../damage/damageController.js"
import { SingleDamage } from "../../damage/damageTypes/single.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { ActivateInstructions } from "./activateInstructions.js"
import { onInstructions } from "./onInstructions.js"

var GameState = ""
var Damage = ""

onInit(function(){

    Damage = new DamageController()
    GameState = new GameStateController()

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

        this.onDamage.add({
            "func": "receiveDamage",
            "class": Damage
        },"last",10)

        this.onHit.add({
            "func": "doDamage",
            "class": Damage
        },"last",10)

        this.onDeath.add({
            "func": "removeObType",
            "class": GameState,
        },"last",10)

    }

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

}