import { InheritController } from "../../generalUtils/inherit.js"
import { DamageController } from "../../damage/damageController.js"
import { CommonImport } from "../common/commonImport.js"
import { AnimationsController } from "../../graphics/animation/animationsController.js"

var Damage
var Animations

onInit(function(){

    Damage = new DamageController()
    Animations = new AnimationsController()

})

export class Undead {

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

        "add_Undead": (updateThis) => {

            updateThis.lifeRegen = 0
            updateThis.energyRegen *= 0.8

            updateThis.defense *= 1.25
            updateThis.resistance -= 0.02

            updateThis.addWeaponObserver.add(
                (weapon) => {

                    Damage.addDamage(
                        weapon,
                        "agony",
                        0.05
                    )

                    Damage.addDamage(weapon, "self swarm", 0.05)
                    Damage.addDamage(weapon, "self swarm production", 0.0001)
                    Damage.addDamage(weapon, "dark energy", 0.01)

                }
            )

            Damage.addDefense(
                updateThis,
                "life",
                "fire",
                -0.05
            )

            Damage.addDefense(
                updateThis,
                "shield",
                "fire",
                -0.01
            )

            Damage.addDefense(
                updateThis,
                "life",
                "physical",
                0.1
            )

            Damage.immunityTo(updateThis, "death")

            Damage.addDefense(
                updateThis,
                "life",
                "revenge",
                -0.01
            )

            Damage.addDamage(updateThis, "self swarm", 0.1)
            Damage.addDamage(updateThis, "self swarm production", 0.005)

            Damage.addDamage(updateThis, "dark energy", 0.05)
            Damage.addDefense(updateThis, "life", "dark energy", 0.05)

            Damage.addDamage(
                updateThis,
                "agony",
                0.1,
            )

            Animations.applyAnimations(
                updateThis,
                [{
                    "animationConfig": {
                        "name":"undead",
                        "frameRandomOffsetX": 0,
                        "frameRandomOffsetY": 0,
                        "randomPointOffsetX": 0,
                        "randomPointOffsetY": 0,
                    },
                    "loopConfig": {
                        "frameOut": 20
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