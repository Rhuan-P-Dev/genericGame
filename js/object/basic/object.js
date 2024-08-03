import { DamageController } from "../../damage/damageController.js"
import { SingleDamage } from "../../damage/damageTypes/single.js"
import { setFrameOut } from "../../frame/frameController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { AnimationsController } from "../../graphics/animation/animationsController.js"
import { CommonImport } from "../common/commonImport.js"
import { ActivateInstructions } from "../instructions/activateInstructions.js"
import { onInstructions } from "../instructions/onInstructions.js"
import { StatsObserverController } from "../instructions/statsObserverController.js"

var GameState = ""
var Damage = ""

onInit(function(){

    Damage = new DamageController()
    GameState = new GameStateController()

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

        Damage.addDamage(this, "physical", 1, true)

        Damage.addDefense(this, "life", "physical", 1, true)
        Damage.addDefense(this, "life", "parasite suck energy", 2, true)

        Damage.addDamageOrder(this, "physical", "life")
        Damage.addDamageOrder(this, "shock", "life")
        Damage.addDamageOrder(this, "fire", "life")
        Damage.addDamageOrder(this, "death", "life")
        Damage.addDamageOrder(this, "dark energy", "life")
        Damage.addDamageOrder(this, "revenge", "life")
        Damage.addDamageOrder(this, "parasite blaster", "life")
        Damage.addDamageOrder(this, "parasite self blaster", "life")
        Damage.addDamageOrder(this, "parasite suck energy damage", "life")
        Damage.addDamageOrder(this, "parasite suck energy", "life")

    }

    passBuildList = {

        "add_basic_objectFunctions": (updateThis) => {

            updateThis.life = new StatsObserverController(updateThis, "life", 10)

            updateThis.life.observer.add(
                (params) => {

                    if(params.currentStatValue <= 0){
                        
                        // The 'onDeath' CANNOT be executed in the same frame as the object dies, or it will cause a fatal bug with the 'thunder' effects.
                        setFrameOut(
                            () => {
                                params.object.onDeath.run({
                                    "object": params.object
                                })
                            },
                            1
                        )

                    }
                }
            )

            updateThis.onDamage.add({
                "func": "reciveDamage",
                "class": Damage
            },"last",10)

            updateThis.onHit.add({
                "func": "doDamage",
                "class": Damage
            },"last",10)
    
            updateThis.onDeath.add({
                "func": "removeObType",
                "class": GameState,
            },"last",10)

            updateThis.onDeath.add({
                "func": () => {
                    new AnimationsController().run({
                        "name":"ship dead",
                        "focus": {
                            "x": updateThis.x,
                            "y": updateThis.y,
                        },
                        "offset": {
                            "x": 0,
                            "y": 0,
                        },
                        "frameRandomOffsetX": 0,
                        "frameRandomOffsetY": 0,
                        "randomPointOffsetX": 0,
                        "randomPointOffsetY": 0,
                    })
                },
            },"last",11)
    
        }

    }

    graphicID = "default"

    team = "newTeam"
    ID = "newID"

    maxLife = 10
    lifeRegen = 0

    resistance = 1

    damage = 1
    damageTypes = {}

    defense = 0
    defenseTypes = {}

    damageOrder = {}

    x = 10
    y = 10

    width = 2
    height = 2

    color = "black"

    currentXVel = 0
    currentYVel = 0

    priority = 0

    effects = {}
    animations = {}

}