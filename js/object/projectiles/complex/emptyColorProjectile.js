
import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { DarkEnergyObject } from "../../uncommon/darkEnergyObject.js"
import { BasicProjetile } from "../basic/basicProjetile.js"

var Effects = ""

onInit(function(){

    Effects = new EffectsController()

})

export class EmptyColorProjetile {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DarkEnergyObject,
                BasicProjetile,
            ],
            build
            
        )

        this.graphicID = "bullet"

        this.maxLife = 2000

        this.width = 8
        this.height = 8

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
                    "range": 100,
                },
            )

            Effects.add(
                "devour",
                "effect",
                {
                    "object": updateThis,
                    "range": 100,
                    "mult": 0.1,
                    "expo": 5,
                },{},true
            )

            Effects.add(
                "attraction",
                "effect",
                {
                    "object": updateThis,
                    "mult": 1,
                    "force": 0.05,
                    "searchConfig":{
                        "maxDistance": 100,
                    }
                },{},true
            )

        }
    }

}