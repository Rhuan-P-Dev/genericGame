import { EffectsController } from "../../../effects/effectsController.js"
import { setFrameOut } from "../../../frame/frameController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { DroneV2 } from "../droneV2.js"

var Effects
var ObjectActivates

onInit(function(){

    Effects = new EffectsController()
    ObjectActivates = new ObjectActivatesController()

})

export class ChessBishop {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                DroneV2,
            ],
            build
        )

        this.graphicID = "chess piece: bishop"

        this.energy *= 4
        this.maxEnergy *= 4

        this.priority *= 2

    }

    passBuildList = {

        "add_ChessPawn_special": (updateThis) => {

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "defense", "heal pulse 2")
                    ObjectActivates.giveActivate(object, "defense", "basic shield area")

                }
            )
        }

    }

}