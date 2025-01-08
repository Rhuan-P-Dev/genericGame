import { DamageController } from "../../../damage/damageController.js"
import { EffectsController } from "../../../effects/effectsController.js"
import { GameStateController } from "../../../gameState/gameStateController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { MultiplyStatsController } from "../../../generalUtils/multiplyStats.js"
import { AnimationsController } from "../../../graphics/animation/animationsController.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { ComplexOnTypeFunctions } from "../../instructions/onInstructions.js"
import { LevelingSystem } from "../../uncommon/levelingSystem.js"
import { Ship } from "../ship.js"

var Damage
var Effects
var Animations
var ObjectActivates
var GameState
var MultiplyStats

onInit(function(){

    Damage = new DamageController()
    Effects = new EffectsController()
    Animations = new AnimationsController()
    ObjectActivates = new ObjectActivatesController()
    GameState = new GameStateController()
    MultiplyStats = new MultiplyStatsController()

})

/* Inspiration(s)

Overall idea: Frisk & Chara from undertale

*/

export class Pacifist {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
                LevelingSystem,
            ],
            build
        )

        this.graphicID = "pacifist"

        this.rotationVel *= 1.25

        this.priority *= 1.5

    }

    passBuildList = {

        "add_Pacifist_special": (updateThis) => {

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "action mercy")
                    ObjectActivates.giveActivate(object, "weapon", "action fight")
                    ObjectActivates.giveActivate(object, "special", "action save")
                    ObjectActivates.giveActivate(object, "special", "action load")
                }
            )

            let transformInGenocide = {
                "prefixFunc": [],
                "func": (params) => {

                    if(params.object.lv >= 20){

                        params.object.graphicID = "genocide"

                        ObjectActivates.removeAllActivate(
                            params.object,
                            "action mercy"
                        )

                        GameState.changeTeam(
                            params.object,
                            {
                                "team": "genocideTeam",
                                "color": "pink"
                            },
                            true
                        )

                        MultiplyStats.multiply(params.object, 0.01)

                    }

                },
                "suffixFunc": [],

                "stage": "first",
                "priority": 1,

            }

            new ComplexOnTypeFunctions().apply(transformInGenocide)

            updateThis.onKill.add(
                transformInGenocide,
                transformInGenocide.stage,
                transformInGenocide.priority
            )

        },

    }

}