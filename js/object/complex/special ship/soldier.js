import { InheritController } from "../../../generalUtils/inherit.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { Ship } from "../ship.js"

var ObjectActivates

onInit(function(){

    ObjectActivates = new ObjectActivatesController()

})

export class Soldier {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
            ],
            build
        )

        this.graphicID = "soldier"

        this.rotationVel *= 1.25

        this.priority *= 1.5

        this.defense *= 1.25
        this.damage *= 1.25

        this.maxLife *= 1.1

        this.maxEnergy *= 1.5
        this.energy *= 1.5
        this.energyRegen *= 1.75

        this.maxShield *= 2
        this.shield *= 2

        this.vel *= 1.3
        this.maxVel *= 1.05

    }

    passBuildList = {

        "Soldier_life": (updateThis) => {

            updateThis.life.math("*", 1.1)

        },

        "Soldier_special": (updateThis) => {

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "auto disassemble 1")
                    ObjectActivates.giveActivate(object, "defense", "band aid")
                    ObjectActivates.giveActivate(object, "factory", "safer perimeter 1")
                    ObjectActivates.giveActivate(object, "special", "turbo 1")
                }
            )

            updateThis.addWeaponObserver.add(
                (activate) => {

                    activate.cost *= 0.8

                }
            )

        },

    }

}