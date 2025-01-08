import { EffectsController } from "../../../effects/effectsController.js"
import { setFrameOut } from "../../../frame/frameController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { BigDrone } from "../bigDrone.js"

var Effects
var ObjectActivates

onInit(function(){

    Effects = new EffectsController()
    ObjectActivates = new ObjectActivatesController()

})

export class ChessTower {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BigDrone,
            ],
            build
        )

        this.graphicID = "chess piece: tower"

        this.priority *= 1.25

        this.defense *= 2

    }

    passBuildList = {

        "add_ChessTower_special": (updateThis) => {

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "big laser")
                },
            )

            Effects.add(
                "deny damage",
                "onDamage",
                {
                    "object": updateThis
                },
            )

            Effects.add(
                "energy barrier",
                "onDamage",
                {
                    "object": updateThis
                },
            )

        },

    }

}