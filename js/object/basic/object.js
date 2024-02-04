import { DamageController } from "../../damage/damageController.js"
import { SingleDamage } from "../../damage/damageTypes/single.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { ConsumeStatsController } from "../../misc/consumeStatsController.js"
import { CommonImport } from "../common/commonImport.js"
import { ActivateInstructions } from "../instructions/activateInstructions.js"
import { onInstructions } from "../instructions/onInstructions.js"

var GameState = ""
var Damage = ""
var ConsumeStats = ""

onInit(function(){

    Damage = new DamageController()
    GameState = new GameStateController()
    ConsumeStats = new ConsumeStatsController()

})

export class Object {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                ActivateInstructions,
                onInstructions,
                SingleDamage,
                CommonImport
            ],
            build
        )

    }

    passBuildList = {

        "add_basic_objectFunctions": (updateThis) => {

            ConsumeStats.add(
                updateThis,
                "life",
                [
                    "last",
                    10
                ],
                (object, damage) => {
                    return (damage * object.resistance) - object.defense
                }
            )

            updateThis.onHit.add({
                "func": "doDamage",
                "class": Damage
            },"last",10)
    
            updateThis.onDeath.add({
                "func": "removeObType",
                "class": GameState,
            },"last",10)
    
        }

    }

    graphicID = "default"

    team = "newTeam"
    ID = "newID"

    life = 10
    maxLife = 10
    lifeRegen = 0

    defense = 0
    resistance = 1

    damage = 1

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