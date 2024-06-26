
import { EffectsController } from "../../../effects/effectsController.js"
import { setFrameOut } from "../../../frame/frameController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { StatsObserverController } from "../../instructions/statsObserverController.js"
import { BasicProjetile } from "../basic/basicProjetile.js"

var Effects = ""

onInit(function(){

    Effects = new EffectsController()

})

export class BlackHoleProjetile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicProjetile
            ],
            build
            
        )

        this.graphicID = "bullet"

        this.maxLife = 2000

        this.width = 12
        this.height = 12

        this.damage = 0

        this.lifeTime = 250

    }

    passBuildList = {

        "blackHoleProjetile_life": (updateThis) => {
            updateThis.life.set(2000)
        },
        ["add_blackHoleFunctions"]: (updateThis) => {

            updateThis.onHit.remove("last",10) // damage

            updateThis.onHit.remove("last", 0) // selfDestruction

            Effects.add(
                "devour",
                "onHit",
                {
                    "object": updateThis,
                },
            )

            Effects.add(
                "devour",
                "effect",
                {
                    "object": updateThis,
                    "range": 200,
                    "mult": 0.05,
                    "expo": 5,
                },{},true
            )

            Effects.add(
                "attraction",
                "effect",
                {
                    "object": updateThis,
                    "mult": 1,
                    "force": 0.05
                },{},true
            )

        }
    }

}