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

export class DarkEnergyIntermediary {

    darkEnergy = 100
    maxDarkEnergy = 100
    darkEnergyRegen = 0.001

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

        "add_dark_energy_damage_defense": (updateThis) => {

            Damage.addDamage(updateThis, "dark energy", 0.1)
            Damage.addDefense(updateThis, "life", "dark energy", 0.1)

        },

        "add_black_flash": (updateThis) => {

            updateThis.addWeaponObserver.add(
                (weapon) => {

                    weapon.useActivateObserver.add(
                        (object, activate, result) => {

                            for (
                                let index = 0;
                                result
                                &&
                                index < result.length;
                                index++
                            ) {

                                let object = result[index].object

                                if(
                                    Math.random() < 0.1
                                ){
                                    Damage.addDamage(
                                        object,
                                        "dark energy",
                                        2.5
                                    )

                                    Animations.applyAnimations(
                                        object,
                                        [
                                            {
                                                "animationConfig": {
                                                    "name":"black flash",
                                                    "focus": {
                                                    },
                                                    "offset": {
                                                    },
                                                    "frameRandomOffsetX": 0,
                                                    "frameRandomOffsetY": 0,
                                                    "randomPointOffsetX": 10,
                                                    "randomPointOffsetY": 10,
                                                },
                                                "loopConfig": {
                                                    "frameOut": 4
                                                },
                                                "runTimeBuild": (object, animationConfig, loopConfig) => {
                                    
                                                    animationConfig.focus = object
                                    
                                                    animationConfig.offset = {
                                                        "x": randomInterval(object.width),
                                                        "y": randomInterval(object.height),
                                                    }
                                    
                                                }
                                            }
                                    
                                        ],
                                        true
                                    )
                                }

                            }

                        }
                    )
                }
            )

        },

    }

}