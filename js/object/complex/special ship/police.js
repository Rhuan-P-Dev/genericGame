import { EffectsController } from "../../../effects/effectsController.js"
import { GenericEffectsController } from "../../../effects/generic/genericEffectsController.js"
import { GameStateController } from "../../../gameState/gameStateController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { Ship } from "../ship.js"

var Effects
var GameState
var GenericEffects

onInit(function(){

    Effects = new EffectsController()
    GameState = new GameStateController()
    GenericEffects = new GenericEffectsController()

})

export class Police {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
            ],
            build
        )

        this.graphicID = "police"

        this.rotationVel *= 1.25

        this.priority *= 2

        this.defense *= 1.25
        this.damage *= 1.25

        this.maxLife *= 1.1

        this.maxEnergy *= 1.1
        this.energy *= 1.1
        this.energyRegen *= 1.25

        this.maxShield *= 1.5
        this.shield *= 1.5

        this.vel *= 1.1

    }

    passBuildList = {

        "Police_life": (updateThis) => {

            updateThis.life.math("*", 1.1)

        },

        "Police_special": (updateThis) => {

            Effects.add(
                "try add star",
                "effect",
                {
                    "object": updateThis,
                },
            )

        },

    }

}