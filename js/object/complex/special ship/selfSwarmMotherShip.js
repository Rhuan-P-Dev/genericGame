import { DamageController } from "../../../damage/damageController.js"
import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../graphics/animation/animationsController.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { SelfSwarmObject } from "../../uncommon/selfSwarmObject.js"
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

/* Inspiration(s)

Overall idea: Mechanite Plague created by Irecreeper
https://steamcommunity.com/sharedfiles/filedetails/?id=2503246357

*/

export class SelfSwarmMotherShip{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
                SelfSwarmObject
            ],
            build
        )

        this.graphicID = "old self swarm drone"

        this.width += 5
        this.height += 5

        this.priority *= 1.75

        this.maxLife *= 2

        this.lifeRegen += 1/(2*60)

        this.energy *= 1.25
        this.energyRegen *= 1.25
        this.maxEnergy *= 1.25

        this.defense *= 1.25
        this.damage *= 1.25

    }

    passBuildList = {

        "add_SelfSwarmMotherShip_special": (updateThis) => {

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "self swarm rain")
                    ObjectActivates.giveActivate(object, "factory", "self swarm melee")
                    ObjectActivates.giveActivate(object, "factory", "self swarm sniper")
                }
            )

            new EffectsController().add(
                "selfSwarmMotherShip's death",
                "onDeath",
                {
                    "object": updateThis,
                },{},true
            )

        },

        "the_SelfSwarmMotherShip_life": (updateThis) => {

            updateThis.life.math("*", 2)
        },

    }

}