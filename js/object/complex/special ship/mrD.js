import { DamageController } from "../../../damage/damageController.js"
import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../graphics/animation/animationsController.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { CombatShrewd } from "../../uncommon/combatShrewd.js"
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

Overall idea: Rap do L (Death Note) - O MAIOR DETETIVE | NERD HITS - https://www.youtube.com/watch?v=fCtWj7X31jE&t=266s

*/

export class MrD{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
                CombatShrewd
            ],
            build
        )

        this.graphicID = "mrD"

        this.priority *= 2.5

        this.maxLife *= 0.5

        this.energy *= 0.5
        this.energyRegen *= 0.5
        this.maxEnergy *= 0.5

        this.defense *= 0.5
        this.damage *= 0.5

    }

    passBuildList = {

        "add_MrD_special": (updateThis) => {

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "piston 1")
                    ObjectActivates.giveActivate(object, "weapon", "auto piston 1")
                    ObjectActivates.giveActivate(object, "special", "camouflage")
                    ObjectActivates.giveActivate(object, "special", "camouflage")
                    ObjectActivates.giveActivate(object, "special", "camouflage")
                }
            )

            Effects.add(
                "mrD's death",
                "onDeath",
                {
                    "object": updateThis,
                },{},true
            )

            Effects.add(
                "mrD's last ally's",
                "effect",
                {
                    "object": updateThis,
                },{},true
            )

        },

        "MrD_life": (updateThis) => {

            updateThis.life.math("*", 0.5)
        },

    }

}