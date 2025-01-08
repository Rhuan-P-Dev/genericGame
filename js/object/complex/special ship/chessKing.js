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

export class ChessKing {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
                RoyaltyPrivileges
            ],
            build
        )

        this.graphicID = "chess piece: king"

        this.priority *= 3

        this.defense *= 0.5

        this.damage *= 0.25

        this.maxLife *= 0.5

        this.maxEnergy *= 0.5
        this.energy *= 0.5
        this.energyRegen *= 0.5

        this.vel *= 0.5
        this.maxVel *= 0.5

    }

    passBuildList = {

        "ChessKing_life": (updateThis) => {

            updateThis.life.math("*", 0.5)

        },

        "ChessKing_special": (updateThis) => {


            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "factory", "call chess horse")
                    ObjectActivates.giveActivate(object, "factory", "call chess bishop")
                    ObjectActivates.giveActivate(object, "factory", "call chess tower")
                }
            )

        },

    }

}