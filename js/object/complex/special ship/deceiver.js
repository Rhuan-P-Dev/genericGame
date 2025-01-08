import { InheritController } from "../../../generalUtils/inherit.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { InvestorSoul } from "../../uncommon/investorSoul.js"
import { SoulCorruption } from "../../uncommon/soulCorruption.js"
import { Ship } from "../ship.js"

var ObjectActivates

onInit(function(){

    ObjectActivates = new ObjectActivatesController()

})

/* Inspiration(s)

Some inspiration: Corpo & Alma | Mahito (Jujutsu Kaisen) | Neko - https://www.youtube.com/watch?v=Od6sPXU4zII

*/

export class Deceiver{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
                InvestorSoul,
                SoulCorruption,
            ],
            build
        )

        this.graphicID = "deceiver"

        this.priority *= 1.5

        this.maxLife *= 1.5

        this.energy *= 1.5
        this.energyRegen *= 1.5
        this.maxEnergy *= 1.5

        this.defense *= 1.25
        this.damage *= 1.5
        this.vel *= 1.3
        this.maxVel *= 1.15

    }

    passBuildList = {

        "add_Deceiver_special": (updateThis) => {

            // uma nave que tem um "poll" de poder se esse poll checkar o maximo ela transende, essse poll consume para o ataque e para a defesa

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "laser web")
                    ObjectActivates.giveActivate(object, "special", "teleport")
                }
            )

        },

        "Deceiver_life": (updateThis) => {

            updateThis.life.math("*", 1.5)

        },

    }

}