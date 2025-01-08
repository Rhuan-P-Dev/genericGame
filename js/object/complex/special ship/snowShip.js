import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { SnowProperties } from "../../uncommon/snowProperties.js"
import { Ship } from "../ship.js"

var Effects
var ObjectActivates

onInit(function(){

    Effects = new EffectsController()
    ObjectActivates = new ObjectActivatesController()

})

export class SnowShip{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
                SnowProperties
            ],
            build
        )

        this.graphicID = "snow ship"

        this.priority *= 1.5

    }

    passBuildList = {

        "add_SnowShip_special": (updateThis) => {

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "snow launcher")
                }
            )

            Effects.add(
                "evolutron",
                "onDeath",
                {
                    "object": updateThis,
                    "statsMult": -0.3,
                },
                {},
                true
            )

            Effects.add(
                "resurrection - 4",
                "onDeath",
                {
                    "object": updateThis,
                },
                {},
                true
            )

            Effects.add(
                "snow area",
                "effect",
                {
                    "object": updateThis,
                },
                {},
                true
            )

        },

    }

}