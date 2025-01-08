import { DamageController } from "../../../damage/damageController.js"
import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../graphics/animation/animationsController.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { PrimordialFlame } from "../../uncommon/primordialFlame.js"
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

export class Fenix {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
                PrimordialFlame,
            ],
            build
        )

        this.graphicID = "fenix base"

        this.priority *= 1.5
        this.width += 2
        this.height += 2

        this.maxLife *= 1.5

        this.vel *= 1.2
        this.maxVel *= 1.1

        Damage.addDamage(this, "fire", 1)

    }

    passBuildList = {

        "add_fenix_special": (updateThis) => {

            Effects.add(
                "resurrection",
                "onDeath",
                {
                    "object": updateThis,
                },{
                    "start": "last",
                    "priority": 3
                }
            )

            Effects.apply(
                "onDeath",
                {
                    "stage": "last",
                    "priority": 2
                },
                "burn",
                "effect",
                {
                    "object": updateThis,
                    "range": 500,
                    "fakeObject": {
                        "damage": 250,
                        "damageTypes": {
                            "fire": 1,
                        }
                    }
                },{
                    "repeat": 1
                }
            )

            updateThis.onDeath.add(
                (params) => {

                    new AnimationsController().applyAnimations(
                        params.object,
                        [
                            {
                                "animationConfig": {
                                    "name":"fenix death explosion",
                                    "focus": {},
                                    "offset": {},
                                    "frameRandomOffsetX": 0,
                                    "frameRandomOffsetY": 0,
                                    "randomPointOffsetX": 0,
                                    "randomPointOffsetY": 0,
                                },
                                "loopConfig": {
                                    "frameOut": 1,
                                    "repeat": 1
                                },
                                "runTimeBuild": (object, animationConfig, loopConfig) => {
                    
                                    animationConfig.focus = object
                    
                                    animationConfig.offset = {
                                        "y": 0,
                                        "x": 0
                                    }
                    
                                }
                            }
                    
                        ]
                    )
                },"last",1
            )

        },

        "fenix_life": (updateThis) => {

            updateThis.life.math("*", 1.5)
    
        },

    }

}