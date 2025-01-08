import { DamageController } from "../../../damage/damageController.js"
import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../graphics/animation/animationsController.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { ComplexOnTypeFunctions } from "../../instructions/onInstructions.js"
import { Ship } from "../ship.js"

var Effects
var Animations
var Damage
var ObjectActivates

onInit(function(){

    Effects = new EffectsController()
    Animations = new AnimationsController()
    Damage = new DamageController()
    ObjectActivates = new ObjectActivatesController()

})

/* Inspiration(s)

Overall idea: Sans from Undertale

*/

// TODO: KARMA!

export class LazySentinel {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
            ],
            build
        )

        this.graphicID = "lazy sentinel - upscale"

        this.priority *= 3

        this.maxLife = 1
        this.maxEnergy *= 0.5
        this.energy *= 0.5
        this.energyRegen *= 4

    }

    passBuildList = {

        "LazySentinel_life": (updateThis) => {

            updateThis.life.set(1)

        },

        "add_LazySentinel_special": (updateThis) => {

            for (let index = 0; index < 22; index++) {

                // normal dodge

                Effects.add(
                    "deny damage",
                    "onDamage",
                    {
                        "object": updateThis,
                    },{
                        "timeout": {
                            "frameOut": 2*60,
                        },
                
                        "stage": "first",
                        "priority": 2,
                    }, true
                )

            }

            // survival dodge

            Effects.add(
                "deny damage",
                "onDamage",
                {
                    "object": updateThis,
                },{
                    "timeout": {
                        "frameOut": 10,
                    },
            
                    "stage": "first",
                    "priority": 3,
                }, true
            )

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "bone launcher")
                    ObjectActivates.giveActivate(object, "factory", "fast laser sentinel")
                    ObjectActivates.giveActivate(object, "factory", "big laser sentinel")
                    ObjectActivates.giveActivate(object, "special", "blink")
                    ObjectActivates.giveActivate(object, "special", "teleport")
                }
            )

            let missAttack = {
                "prefixFunc": [],
                "func": (params) => {

                    Animations.applyAnimations(
                        params.object,
                        [{
                            "animationConfig": {
                                "name":"miss attack",
                                "frameRandomOffsetX": 0,
                                "frameRandomOffsetY": 0,
                                "randomPointOffsetX": 0,
                                "randomPointOffsetY": 0,
                            },
                            "loopConfig": {
                                "frameOut":1,
                                "repeat": 1,
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
                        false
                    )

                },
                "suffixFunc": [],
                "stage": "first",
                "priority": 1,

            }

            new ComplexOnTypeFunctions().apply(missAttack)

            updateThis.onDamage.add(
                missAttack,
                missAttack.stage,
                missAttack.priority
            )

        },

    }

}