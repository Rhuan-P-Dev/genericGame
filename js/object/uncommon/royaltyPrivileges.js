import { EffectsController } from "../../effects/effectsController.js"
import { setFrameOut } from "../../frame/frameController.js"
import { InheritController } from "../../generalUtils/inherit.js"
import { ObjectActivatesController } from "../../objectController/objectActivatesController.js"
import { CommonImport } from "../common/commonImport.js"

var Effects
var ObjectActivates

onInit(function(){

    Effects = new EffectsController()
    ObjectActivates = new ObjectActivatesController()

})

export class RoyaltyPrivileges {

    royaltyPoints = 24
    royaltyPointsMax = 24

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                CommonImport,
            ],
            build
        )

    }

    passBuildList = {

        "add_RoyaltyPrivileges": (updateThis) => {

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "factory", "call chess pawn")
                }
            )

            Effects.add(
                "royalty guard",
                "effect",
                {
                    "object": updateThis,
                },{},true
            )

            Effects.add(
                "royalty scout",
                "effect",
                {
                    "object": updateThis,
                },{},true
            )

        },

    }

}