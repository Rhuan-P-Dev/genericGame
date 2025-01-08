import { DamageController } from "../../../damage/damageController.js"
import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../graphics/animation/animationsController.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { RoyaltyPrivileges } from "../../uncommon/royaltyPrivileges.js"
import { Ship } from "../ship.js"

var Damage
var Effects
var Animations
var ObjectActivates

onInit(function(){

    Damage = new DamageController()
    Effects = new EffectsController()
    Animations = new AnimationsController()
    ObjectActivates = new ObjectActivatesController()

})

export class ChessQueen {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
                RoyaltyPrivileges
            ],
            build
        )

        this.graphicID = "chess piece: queen"

        this.shield *= 5
        this.maxShield *= 5

        this.priority *= 2.5

        this.defense *= 2

        this.damage *= 3

        this.maxLife *= 2

        this.width *= 1.2
        this.height *= 1.2

        this.maxEnergy *= 2
        this.energy *= 2
        this.energyRegen *= 2

        this.resistance -= 0.1

        this.maxVel *= 1.25

    }

    passBuildList = {

        "ChessQueen_life": (updateThis) => {

            updateThis.life.math("*", 2)

        },

        "ChessQueen_special": (updateThis) => {

            Effects.add(
                "queen's war call",
                "effect",
                {
                    "object": updateThis,
                },
            )

            for (let index = 0; index < 3; index++) {
                
                Effects.add(
                    "queen's war call",
                    "onDamage",
                    {
                        "object": updateThis,
                    },
                )

            }

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "sniper laser 1")
                    ObjectActivates.giveActivate(object, "weapon", "missile cluster 1")
                    ObjectActivates.giveActivate(object, "factory", "call chess horse")
                    ObjectActivates.giveActivate(object, "special", "turbo 2")
                    ObjectActivates.giveActivate(object, "special", "turbo 2")
                }
            )

        },

    }

}