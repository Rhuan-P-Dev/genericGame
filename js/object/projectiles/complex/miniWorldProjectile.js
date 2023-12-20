
import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { BasicProjetile } from "../basic/basicProjetile.js"

var Effects = ""

onInit(function(){

    Effects = new EffectsController()

})

export class MiniWorldProjectile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BasicProjetile
            ],
            build
            
        )

        this.life = 150
        this.maxLife = 150

        this.width = 8
        this.height = 8

        this.defense = 2
        this.damage = 10

        this.lifeTime = 1000

    }

    passBuildList = {
        ["add_miniWorldFunctions"]: (updateThis) => {

            updateThis.onHit.remove("last", 0) // selfDestruction

            Effects.add(
                "attraction",
                "effect",
                {
                    "object": updateThis,
                    "range": 100,
                    "mult": 1,
                    "force": 0.01
                },{},true
            )

        }
    }

}