import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { Death } from "../../uncommon/death.js"
import { Ship } from "../ship.js"

var Effects
var ObjectActivates

onInit(function(){

    Effects = new EffectsController()
    ObjectActivates = new ObjectActivatesController()

})

export class Reaper {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
                Death
            ],
            build
        )

        this.graphicID = "reaper"

        this.priority *= 3

        this.lifeRegen += 10/60

        this.defense *= 1.5

        this.damage *= 3

        this.maxLife *= 1.5

        this.maxEnergy *= 2
        this.energy *= 2
        this.energyRegen *= 2

        this.maxShield *= 1.25
        this.shield *= 1.25
        this.shieldRegen *= 5

        this.resistance -= 0.05

        this.width *= 1.4
        this.height *= 1.4

        this.vel *= 2
        this.maxVel *= 1.25

    }

    passBuildList = {

        "Reaper_life": (updateThis) => {

            updateThis.life.math("*", 1.5)

        },

        "Reaper_special": (updateThis) => {

            Effects.add(
                "reaper's death pulse",
                "effect",
                {
                    "object": updateThis,
                },
            )

            Effects.add(
                "reaper's final invitation",
                "onDeath",
                {
                    "object": updateThis,
                },
            )

            Effects.add(
                "reaper's whispers of souls",
                "onKill",
                {
                    "object": updateThis,
                },
            )

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "death ray")
                    ObjectActivates.giveActivate(object, "weapon", "death hand launcher")
                    ObjectActivates.giveActivate(object, "weapon", "death hand launcher")
                    ObjectActivates.giveActivate(object, "weapon", "auto death hand launcher")
                }
            )

        },

    }

}