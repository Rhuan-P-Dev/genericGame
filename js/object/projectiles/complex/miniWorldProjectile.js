
import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../graphics/animation/animationsController.js"
import { BasicProjetile } from "../basic/basicProjetile.js"

var Effects = ""
var Animations

onInit(function(){

    Effects = new EffectsController()
    Animations = new AnimationsController()

})

export class MiniWorldProjectile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicProjetile
            ],
            build
            
        )

        this.graphicID = "mini world"

        this.maxLife = 150

        this.width = 8
        this.height = 8

        this.defense = 2
        this.damage = 10

        this.lifeTime = 1000

    }

    passBuildList = {

        "miniWorldProjectile_life": (updateThis) => {
            updateThis.life.set(150)
        },

        ["add_miniWorldFunctions"]: (updateThis) => {

            updateThis.onHit.remove("last", 0) // selfDestruction

            Effects.add(
                "attraction",
                "effect",
                {
                    "object": updateThis,
                    "range": 100,
                    "mult": 1,
                    "force": 0.01
                },{},true
            )

            Animations.applyAnimations(
                updateThis,
                [{
                    "animationConfig": {
                        "name":"worlds",
                        "frameRandomOffsetX": 0,
                        "frameRandomOffsetY": 0,
                        "randomPointOffsetX": 0,
                        "randomPointOffsetY": 0,
                    },
                    "loopConfig": {
                        "frameOut": 15
                    },
                    "runTimeBuild": (object, animationConfig, loopConfig) => {
        
                        animationConfig.focus = object
        
                        animationConfig.offset = {
                            "x": 0,
                            "y": 0,
                        }
        
                    }
                }],
                true
            )

        }
    }

}