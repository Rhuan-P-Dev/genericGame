
import { DamageController } from "../../../damage/damageController.js"
import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../graphics/animation/animationsController.js"
import { MovableObject } from "../../basic/movableObject.js"
import { Rotable } from "../../basic/rotable.js"
import { Death } from "../../uncommon/death.js"
import { BasicWithLifeProjectile } from "../basic/basicWithLifeProjectile.js"

var Effects = ""
var Animations
var Damage

onInit(function(){

    Effects = new EffectsController()
    Animations = new AnimationsController()
    Damage = new DamageController()

})

export class DeathHand {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicWithLifeProjectile,
                Rotable,
                MovableObject,
                Death
            ],
            build
            
        )

        this.graphicID = "death hand"

        this.maxLife = 200

        this.width = 6
        this.height = 6

        this.defense = 0
        this.damage = 1

        this.lifeTime = 500

        this.maxVel /= 2
        this.vel *= 2
        this.rotationVel *= 4

    }

    passBuildList = {

        "deathHand_life": (updateThis) => {
            updateThis.life.set(200)
        },

        ["add_deathHandFunctions"]: (updateThis) => {

            Effects.apply(
                "onHit",
                {},
                "death hand",
                "effect",
                {
                    "object": updateThis,
                },
            )

        }
    }

}