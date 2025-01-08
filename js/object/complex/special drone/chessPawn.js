import { EffectsController } from "../../../effects/effectsController.js"
import { setFrameOut } from "../../../frame/frameController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { Drone } from "../drone.js"

var Effects
var ObjectActivates

onInit(function(){

    Effects = new EffectsController()
    ObjectActivates = new ObjectActivatesController()

})

export class ChessPawn {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Drone,
            ],
            build
        )

        this.graphicID = "chess piece: pawn"

        this.priority *= 1.2

        this.defense *= 2

        this.rotationVel *= 1.1

    }

    passBuildList = {

        "add_ChessPawn_special": (updateThis) => {

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "piston 1")
                }
            )

            Effects.add(
                "deflet area",
                "onHit",
                {
                    "object": updateThis
                },{
                    "timeout": {
                        "frameOut": 2*60,
                    },
                }
            )

        },

    }

}