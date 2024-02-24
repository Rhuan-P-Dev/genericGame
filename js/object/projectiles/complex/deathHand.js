
import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { MovableObject } from "../../basic/movableObject.js"
import { Rotable } from "../../basic/rotable.js"
import { BasicProjetile } from "../basic/basicProjetile.js"

var Effects = ""

onInit(function(){

    Effects = new EffectsController()

})

export class DeathHand {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicProjetile,
                Rotable,
                MovableObject,
            ],
            build
            
        )

        this.graphicID = "death hand"

        this.life = 200
        this.maxLife = 200

        this.width = 6
        this.height = 6

        this.defense = 0
        this.damage = 0

        this.lifeTime = 500

        this.maxVel /= 2
        this.vel *= 2
        this.rotationVel *= 4

    }

    passBuildList = {
        ["add_deathHandFunctions"]: (updateThis) => {

            updateThis.onHit.remove("last", 0) // selfDestruction

            Effects.apply(
                "onHit",
                "burn",
                "effect",
                {
                    "object": updateThis,
                    "damage": 1,
                },
                {
                    "frameOut": 60,
                    "repeat": -1,
                },
            )

        }
    }

}