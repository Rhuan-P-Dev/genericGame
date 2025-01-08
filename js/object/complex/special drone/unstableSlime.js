import { InheritController } from "../../../generalUtils/inherit.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { GelatinousArmor } from "../../uncommon/gelatinousArmor.js"
import { Drone } from "../drone.js"

var ObjectActivates

onInit(function(){

    ObjectActivates = new ObjectActivatesController()

})

export class UnstableSlime {

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

        this.priority *= 1.5

        this.vel *= 1.2
        this.maxVel *= 1.05

        this.maxLife *= 1.05

        this.energy *= 1.05
        this.energyRegen *= 1.05
        this.maxEnergy *= 1.05

        this.defense *= 1.5
        this.resistance = 0.95

        this.rotationVel *= 1.5

        this.width *= 0.8
        this.height *= 0.8

        this.damage *= 2

        this.lifeRegen = -(this.maxLife/(20*60))

    }

    passBuildList = {

        "add_UnstableSlime_special": (updateThis) => {

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "random")
                }
            )

        },

        "UnstableSlime_life": (updateThis) => {
            updateThis.life.math("*", 5)
        },

    }

}