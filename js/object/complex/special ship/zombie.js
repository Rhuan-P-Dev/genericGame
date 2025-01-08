import { DamageController } from "../../../damage/damageController.js"
import { EffectsController } from "../../../effects/effectsController.js"
import { setFrameOut } from "../../../frame/frameController.js"
import { InheritController } from "../../../generalUtils/inherit.js"
import { AnimationsController } from "../../../graphics/animation/animationsController.js"
import { ObjectActivatesController } from "../../../objectController/objectActivatesController.js"
import { Undead } from "../../uncommon/undead.js"
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

export class Zombie{

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                Ship,
                Undead
            ],
            build
        )

        this.graphicID = "zombie"

        this.priority *= 1.5

        this.maxLife *= 0.9

        this.energy *= 0.9
        this.energyRegen *= 0.9
        this.maxEnergy *= 0.9

        this.defense *= 0.9
        this.damage *= 0.9

    }

    passBuildList = {

        "add_zombie_special": (updateThis) => {

            updateThis.addActivatesPromises.push(
                (object) => {
                    ObjectActivates.giveActivate(object, "weapon", "piston 1")
                }
            )

            Effects.add(
                "zombies horde",
                "effect",
                {
                    "object": updateThis,
                },{},true
            )

            setFrameOut(
                () => {

                    Effects.add(
                        "zombies horde",
                        "onDamage",
                        {
                            "object": updateThis,
                        },{},true
                    )

                    //onKill?

                },20*60
            )

        },

        "zombie_life": (updateThis) => {

            updateThis.life.math("*", 0.9)

        },

    }

}