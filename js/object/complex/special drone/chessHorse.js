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

export class ChessHorse {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                BigDrone,
            ],
            build
        )

        this.graphicID = "chess piece: horse"

        this.priority *= 1.5

        this.energy *= 2
        this.maxEnergy *= 2

        this.defense *= 1.25

    }

    passBuildList = {

        "add_ChessHorse_special": (updateThis) => {

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "electrified missile 1")
                    ObjectActivates.giveActivate(object, "special", "teleport")
                }
            )

        },

    }

}
