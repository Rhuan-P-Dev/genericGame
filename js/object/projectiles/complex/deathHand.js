
import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../graphics/animation/animationsController.js"
import { MovableObject } from "../../basic/movableObject.js"
import { Rotable } from "../../basic/rotable.js"
import { BasicProjetile } from "../basic/basicProjetile.js"

var Effects = ""
var Animations

onInit(function(){

    Effects = new EffectsController()
    Animations = new AnimationsController()

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

        "deathHand_life": (updateThis) => {
            updateThis.life.set(200)
        },

        ["add_deathHandFunctions"]: (updateThis) => {

            updateThis.onHit.remove("last", 0) // selfDestruction

            Effects.apply(
                "onHit",
                "death hand",
                "effect",
                {
                    "object": updateThis,
                },
            )

            Animations.applyAnimations(
                updateThis,
                [{
                    "animationConfig": {
                        "name":"death",
                        "frameRandomOffsetX": 0,
                        "frameRandomOffsetY": 0,
                        "randomPointOffsetX": 0,
                        "randomPointOffsetY": 0,
                    },
                    "loopConfig": {
                        "frameOut": 10
                    },
                    "runTimeBuild": (object, animationConfig, loopConfig) => {
        
                        animationConfig.focus = {
                            "x": object.x,
                            "y": object.y,
                        }
        
                        animationConfig.offset = {
                            "x": randomInterval(object.width),
                            "y": randomInterval(object.height),
                        }
        
                    }
                }],
                true
            )

        }
    }

}