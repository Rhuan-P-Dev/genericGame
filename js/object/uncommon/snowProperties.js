import { DamageController } from "../../damage/damageController.js"
import { EffectsController } from "../../effects/effectsController.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { AnimationsController } from "../../graphics/animation/animationsController.js"
import { CommonImport } from "../common/commonImport.js"

var Damage
var Animations
var Effects

onInit(function(){

    Damage = new DamageController()
    Animations = new AnimationsController()
    Effects = new EffectsController()

})

export class SnowProperties {

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

        "add_SnowProperties": (updateThis) => {

            Damage.addDamage(updateThis, "snow", 1)

            updateThis.addWeaponObserver.add(
                (weapon) => {
                    Damage.addDamage(
                        weapon,
                        "snow",
                        0.25,
                    )
                }
            )

            Damage.addDefense(updateThis, "life", "physical", 0.25)

            Damage.addDefense(updateThis, "life", "self swarm", 0.1)
            Damage.addDefense(updateThis, "life", "self swarm production", 0.1)

            Damage.addDefense(updateThis, "life", "laser", -0.1)
            Damage.addDefense(updateThis, "life", "fire", -0.05)
            Damage.addDefense(updateThis, "life", "shock", -0.01)
 
            Damage.immunityTo(updateThis, "snow")

            Animations.applyAnimations(
                updateThis,
                [{
                    "animationConfig": {
                        "name":"snow",
                        "frameRandomOffsetX": 0,
                        "frameRandomOffsetY": 0,
                        "randomPointOffsetX": 0,
                        "randomPointOffsetY": 0,
                    },
                    "loopConfig": {
                        "frameOut": 5
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
            Animations.applyAnimations(
                updateThis,
                [{
                    "animationConfig": {
                        "name":"snow",
                        "frameRandomOffsetX": 0,
                        "frameRandomOffsetY": 0,
                        "randomPointOffsetX": 0,
                        "randomPointOffsetY": 0,
                    },
                    "loopConfig": {
                        "frameOut": 5
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
            )

        }

    }

}