import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { GelatinousArmor } from "../../uncommon/gelatinousArmor.js"
import { Drone } from "../drone.js"

var ObjectActivates
var Effects

onInit(function(){

    ObjectActivates = new ObjectActivatesController()
    Effects = new EffectsController()

})

export class Slime {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Drone,
                GelatinousArmor
            ],
            build
        )

        this.graphicID = "slime"

        this.priority *= 3

        this.vel *= 1.7

        this.maxVel *= 1.25

        this.maxLife *= 1.25

        this.energy *= 1.25
        this.energyRegen *= 1.25
        this.maxEnergy *= 1.25

        this.defense *= 4
        this.resistance = 0.9

        this.width *= 1.1
        this.height *= 1.1

        this.rotationVel *= 2

        this.damage *= 5

    }

    passBuildList = {

        "add_slime_special": (updateThis) => {

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "random")
                }
            )

            Effects.add(
                "slime's death",
                "onDeath",
                {
                    "object": updateThis,
                },
            )

        },

        "slime_life": (updateThis) => {
            updateThis.life.math("*", 5)
        },

    }

}