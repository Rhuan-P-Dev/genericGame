import { DamageController } from "../../damage/damageController.js"
import { EffectsController } from "../../effects/effectsController.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { MultiplyStatsController } from "../../generalUtils/multiplyStats.js"
import { AnimationsController } from "../../graphics/animation/animationsController.js"
import { CommonImport } from "../common/commonImport.js"

var Animations
var Damage
var MultiplyStats
var Effects

onInit(function(){

    Animations = new AnimationsController()
    Damage = new DamageController()
    MultiplyStats = new MultiplyStatsController()
    Effects = new EffectsController()

})

export class InvestorSoul {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                CommonImport
            ],
            build
        )

    }

    halfingStats = [
        "life",
        "energy",
        "shield",
        "darkEnergy"
    ]

    passBuildList = {

        "add_InvestorSoul": (updateThis) => {

            Effects.add(
                "investor soul",
                "effect",
                {
                    "object": updateThis,
                },{},true
            )

            for (let index = 0; index < this.halfingStats.length; index++) {

                const statName = this.halfingStats[index]

                if(updateThis[statName] === undefined){continue}

                if(
                    typeof updateThis[statName] == "number"
                ){
                    updateThis[statName] *= 0.5
                }else{
                    updateThis[statName].math("*", 0.5)
                }

            }

        },

    }

}