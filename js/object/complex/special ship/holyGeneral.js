import { setFrameOut } from "../../../frame/frameController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { DivineEnergyIntermediary } from "../../uncommon/divineEnergyIntermediary.js"
import { Ship } from "../ship.js"

var ObjectActivates

onInit(function(){

    ObjectActivates = new ObjectActivatesController()

})

/* Inspiration(s)

Name idea: Tipo Mahoraga 🔆 (Jujutsu Kaisen) A MALDIÇÃO DAS MALDIÇÕES | Prod. MK & SID | MHRAP - https://youtu.be/F9cp7Lh6zfE?si=hLS5OOkLoaAgRMkO&t=37

*/

export class HolyGeneral {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
                DivineEnergyIntermediary
            ],
            build
        )

        this.width *= 1.25
        this.height *= 1.25

        this.graphicID = "holy general"

        this.rotationVel *= 1.5

        this.priority *= 2

        this.maxLife *= 0.25

        this.maxEnergy *= 3
        this.energy *= 3

        this.energyRegen *= 0.25

        this.maxShield *= 0.5
        this.shield *= 0.5

        this.vel *= 0.8
        this.maxVel *= 0.5

    }

    passBuildList = {

        "HolyGeneral_life": (updateThis) => {

            updateThis.life.math("*", 0.25)

        },

        "HolyGeneral_special": (updateThis) => {

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "auto piston 1")
                    ObjectActivates.giveActivate(object, "weapon", "auto piston 1")
                    ObjectActivates.giveActivate(object, "weapon", "auto piston 1")
                    ObjectActivates.giveActivate(object, "weapon", "auto piston 1")
                    ObjectActivates.giveActivate(object, "factory", "summon ship")
                    ObjectActivates.giveActivate(object, "factory", "summon senior soldier")
                    ObjectActivates.giveActivate(object, "factory", "war factory")
                    ObjectActivates.giveActivate(object, "factory", "adaptive factory")
                    ObjectActivates.giveActivate(object, "factory", "evolve factory")
                    ObjectActivates.giveActivate(object, "factory", "basic safe zone 1")
                    ObjectActivates.giveActivate(object, "factory", "factory ship")
                }
            )

        },

    }

}