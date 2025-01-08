import { DamageController } from "../../../damage/damageController.js"
import { EffectsController } from "../../../effects/effectsController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../graphics/animation/animationsController.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { DarkEnergyObject } from "../../uncommon/darkEnergyObject.js"
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

Overall idea: Satoru Gojo from Jujutsu Kaisen

*/

export class TheBlessed {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
                DarkEnergyObject,
            ],
            build
        )

        this.priority *= 4

        this.maxLife *= 0.5
        this.maxEnergy *= 0.5
        this.energyRegen /= 2

        this.darkEnergy *= 10
        this.maxDarkEnergy *= 10
        this.darkEnergyRegen *= 10

        Damage.addDamage(this, "dark energy", 1)

        Damage.addDefense(this, "life", "dark energy", 1.25, true)

    }

    passBuildList = {

        "the_blessed_life": (updateThis) => {

            updateThis.life.math("*", 0.5)

        },

        "add_the_blessed_special": (updateThis) => {

            Effects.add(
                "the blessed effect: reverse",
                "effect",
                {
                    "object": updateThis,
                },{},true
            )

            Effects.add(
                "untouchable",
                "effect",
                {
                    "object": updateThis,
                    "mult": 2,
                    "range": 25
                },{
                    "repeat": -1,
                    "frameOut": 1,
                },true
            )

            for (let index = 0; index < 5; index++) {
                
                Effects.add(
                    "deny damage",
                    "onDamage",
                    {
                        "object": updateThis,
                    },{
                        "timeout": {
                            "frameOut": 10 * (index + 1),
                        },
                
                        "stage": "first",
                        "priority": 2,
                    }, true
                )

            }

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "blessed blue")
                    ObjectActivates.giveActivate(object, "weapon", "auto blessed blue")
                    ObjectActivates.giveActivate(object, "weapon", "blessed red")
                    ObjectActivates.giveActivate(object, "weapon", "empty color")
                    ObjectActivates.giveActivate(object, "weapon", "blessed special")
                    ObjectActivates.giveActivate(object, "special", "teleport")
                }
            )

            Effects.apply(
                "onDamage",
                {
                    "stage": "first",
                    "priority": 0,
                    "suffixFunc": ["timeout"],
                    "timeout": {
                        "frameOut": 3*60,
                    },
                },
                "the blessed effect: blue",
                "effect",
                {
                    "object": updateThis,
                },{},true
            )

        },

    }

}