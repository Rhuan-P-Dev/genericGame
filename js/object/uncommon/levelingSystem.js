import { DamageController } from "../../damage/damageController.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { MultiplyStatsController } from "../../generalUtils/multiplyStats.js"
import { AnimationsController } from "../../graphics/animation/animationsController.js"
import { CommonImport } from "../common/commonImport.js"
import { ComplexOnTypeFunctions } from "../instructions/onInstructions.js"

var Animations
var Damage
var MultiplyStats

onInit(function(){

    Animations = new AnimationsController()
    Damage = new DamageController()
    MultiplyStats = new MultiplyStatsController()

})

export class LevelingSystem {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                CommonImport
            ],
            build
        )

    }

    lv = 1
    xp = 0
    xpMax = 2

    actionPoints = 1
    maxActionPoints = 1
    actionPointsRegen = 1/(2*60)

    passBuildList = {

        "LevelingSystem": (updateThis) => {

            let whenKill = {
                "prefixFunc": [],
                "func": (params) => {

                    const XP = params.otherObject.priority / 6

                    params.object.xp += XP

                    while(
                        params.object.xp > params.object.xpMax
                    ){

                        params.object.xp -= params.object.xpMax

                        params.object.lv += 1

                        MultiplyStats.multiply(params.object, 0.05)

                        params.object.xpMax *= 1.1

                        params.object.maxActionPoints += 1
                        params.object.actionPointsRegen *= 1.05

                    }

                },
                "suffixFunc": [],

                "stage": "first",
                "priority": 1,

            }

            new ComplexOnTypeFunctions().apply(whenKill)

            updateThis.onKill.add(
                whenKill,
                whenKill.stage,
                whenKill.priority
            )

        },

    }

}