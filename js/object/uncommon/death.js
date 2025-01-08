import { DamageController } from "../../damage/damageController.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { AnimationsController } from "../../graphics/animation/animationsController.js"
import { CommonImport } from "../common/commonImport.js"

var Damage
var Animations

onInit(function(){

    Damage = new DamageController()
    Animations = new AnimationsController()

})

export class Death {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                CommonImport,
            ],
            build
        )

    }

    passBuildList = {

        "add_Death": (updateThis) => {

            updateThis.addWeaponObserver.add(
                (weapon) => {

                    Damage.addDamage(
                        weapon,
                        "death",
                        0.1
                    )

                }
            )

            Damage.immunityTo(updateThis, "death")
            Damage.addDamage(updateThis, "death", 1)

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

        },

    }

}