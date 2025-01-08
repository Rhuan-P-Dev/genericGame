import { DamageController } from "../../../damage/damageController.js"
import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../graphics/animation/animationsController.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { ComplexOnTypeFunctions } from "../../instructions/onInstructions.js"
import { CombatShrewd } from "../../uncommon/combatShrewd.js"
import { DivineEnergyIntermediary } from "../../uncommon/divineEnergyIntermediary.js"
import { Ship } from "../ship.js"

var Damage
var Animations
var ObjectActivates
var Effects

onInit(function(){

    Damage = new DamageController()
    Animations = new AnimationsController()
    ObjectActivates = new ObjectActivatesController()
    Effects = new EffectsController()

})

/* Inspiration(s)

Overall idea: Hipnose Perfeita | Aizen (Bleach) | Enygma - https://youtu.be/osN7Jp4mk9E?si=YOi1067qh_xIZmDo&t=103

*/

export class LordIllusionist {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
            ],
            build
        )

        this.graphicID = "lordIllusionist"

        this.priority *= 0.65

        this.width *= 1.1
        this.height *= 1.1

    }

    markedEnemys = {}

    passBuildList = {

        "LordIllusionist_special": (updateThis) => {

            let markEnemys = {
                "prefixFunc": [],
                "func": (params) => {

                    params.object.markedEnemys[
                        params.otherObjectMaster.ID
                    ] = params.otherObjectMaster

                },

                "stage": "first",
                "priority": 1,

            }

            new ComplexOnTypeFunctions().apply(markEnemys)

            updateThis.onDamage.add(
                markEnemys,
                markEnemys.stage,
                markEnemys.priority
            )

            let illusionOfDeath = {
                "prefixFunc": [],
                "func": (params) => {

                    Effects.add(
                        "illusion v1",
                        "effect",
                        {
                            "object": updateThis,
                        },{
                            "frameOut": 10*60,
                            "repeat": -1,
                        }
                    )

                    ObjectActivates.giveActivate(params.object, "weapon", "minor judgment")
                    ObjectActivates.giveActivate(params.object, "defense", "minor divine revitalization")
                    ObjectActivates.giveActivate(params.object, "special", "minor perfect area clone")
                    ObjectActivates.giveActivate(params.object, "factory", "summon holy general")

                    new InheritController().inherit(
                        this,
                        [
                            DivineEnergyIntermediary,
                            CombatShrewd
                        ],
                        true
                    )

                    Damage.addDamage(
                        params.object,
                        "surprise attack",
                        0.5,
                    )

                    Damage.addDefense(
                        params.object,
                        "life",
                        "surprise attack",
                        1
                    )

                    Damage.addDefense(
                        params.object,
                        "shield",
                        "surprise attack",
                        1
                    )

                    updateThis.addWeaponObserver.add(
                        (weapon) => {

                            Damage.addDamage(
                                weapon,
                                "surprise attack",
                                0.25
                            )

                        }
                    )

                    params.object.width *= 1.5
                    params.object.height *= 1.5

                    // "avoid" black hole effect
                    params.object.maxLife = 500

                    params.object.maxEnergy *= 2
                    params.object.maxShield *= 2

                    params.object.lifeRegen += 10/60
                    params.object.energyRegen *= 2
                    params.object.shieldRegen *= 2

                    params.object.defense *= 1.5
                    params.object.damage *= 1.5

                    params.object.priority *= 9

                    params.object.vel *= 1.25
                    params.object.maxVel *= 1.1

                    params.object.graphicID = "lordIllusionist - final"

                    params.object.energy = params.object.maxEnergy
                    params.object.shield = params.object.maxShield

                    params.object.life.set(
                        params.object.maxLife
                    )

                    for (const ID in this.markedEnemys) {
                        if(
                            this.markedEnemys[ID]
                            &&
                            this.markedEnemys[ID].life
                        ){

                            Damage.doMinimalAttack(
                                30
                                +
                                (
                                    this.markedEnemys[ID].maxLife
                                    *
                                    0.33
                                ),{
                                    "surprise attack": 1
                                },
                                params.object,
                                this.markedEnemys[ID]
                            )

                        }
                    }

                    Animations.applyAnimations(
                        params.object,
                        [{
                            "animationConfig": {
                                "name":"lordIllusionist's fake death",
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
                
                                animationConfig.focus = object
                
                                animationConfig.offset = {
                                    "x": randomInterval(object.width),
                                    "y": randomInterval(object.height),
                                }
                
                            }
                        }],
                        false
                    )

                },
                "suffixFunc": ["stopStages","deleteInstruction"],

                "stopStages": {
                    "stages": ["first", "middle", "last"],
                },

                "stage": "first",
                "priority": 1,

            }

            new ComplexOnTypeFunctions().apply(illusionOfDeath)

            updateThis.onDeath.add(
                illusionOfDeath,
                illusionOfDeath.stage,
                illusionOfDeath.priority
            )

        },

    }

}