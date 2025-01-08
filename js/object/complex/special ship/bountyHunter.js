import { DamageController } from "../../../damage/damageController.js"
import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../graphics/animation/animationsController.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { Ship } from "../ship.js"

var Effects
var Animations
var Damage
var ObjectActivates

onInit(function(){

    Effects = new EffectsController()
    Animations = new AnimationsController()
    Damage = new DamageController()
    ObjectActivates = new ObjectActivatesController()

})

export class BountyHunter{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
            ],
            build
        )

        this.graphicID = "bounty hunter"

        this.priority *= 1.25

        this.maxLife *= 1.1

        this.energy *= 1.1
        this.energyRegen *= 1.1
        this.maxEnergy *= 1.1

        this.defense *= 1.25
        this.damage *= 1.1
        this.vel *= 1.1
        this.maxVel *= 1.05

    }

    passBuildList = {

        "add_BountyHunter_special": (updateThis) => {

            Effects.add(
                "bounty search",
                "effect",
                {
                    "object": updateThis,
                },{
                    "frameOut": 15*60,
                    "repeat": -1,
                }
            )

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "special", "turbo 1")
                    ObjectActivates.giveActivate(object, "special", "camouflage")
                    ObjectActivates.giveActivate(object, "special", "teleport")
                }
            )

        },

        "BountyHunter_life": (updateThis) => {

            updateThis.life.math("*", 1.1)
        },

    }

}