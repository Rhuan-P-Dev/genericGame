import { InheritController } from "../../generalUtils/inherit.js"
import { DamageController } from "../../damage/damageController.js"
import { AnimationsController } from "../../graphics/animation/animationsController.js"
import { CommonImport } from "../common/commonImport.js"

var Damage
var Animations

onInit(function(){

    Damage = new DamageController()
    Animations = new AnimationsController()

})

export class DivineEnergyIntermediary {

    maxDivineEnergy = 100
    divineEnergy = 100
    divineEnergyRegen = 1/(60*2)

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                CommonImport
            ],
            build
        )

    }

    passBuildList = {

        "add_Divine": (updateThis) => {

            Animations.applyAnimations(
                updateThis,
                [{
                    "animationConfig": {
                        "name":"divine halo",
                        "focus": {},
                        "offset": {},
                        "frameRandomOffsetX": 0,
                        "frameRandomOffsetY": 0,
                        "randomPointOffsetX": 0,
                        "randomPointOffsetY": 0,
                    },
                    "loopConfig": {
                        "frameOut": 12
                    },
                    "runTimeBuild": (object, animationConfig, loopConfig) => {

                        animationConfig.focus = object
        
                        animationConfig.offset = {
                            "x": 0,
                            "y": 0,
                        }
        
                    }
                }],
                false
            )

            Animations.applyAnimations(
                updateThis,
                [{
                    "animationConfig": {
                        "name":"divine halo",
                        "focus": {
                        },
                        "offset": {
                        },
                        "frameRandomOffsetX": 0,
                        "frameRandomOffsetY": 0,
                        "randomPointOffsetX": 0,
                        "randomPointOffsetY": 0,
                    },
                    "loopConfig": {
                        "frameOut": 12
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

            updateThis.energyRegen *= 2

            updateThis.lifeRegen += 2.5/60
            updateThis.lifeRegen *= 2

            updateThis.vel *= 1.25
            updateThis.maxVel *= 1.1

            updateThis.resistance -= 0.02

            updateThis.priority += 1
            updateThis.priority *= 1.25

            // TODO
            // colocar um feito de transmisão de dano?

        },

    }

}