import { InheritController } from "../../generalUtils/inherit.js"
import { Object } from "../basic/object.js"
import { DamageController } from "../../damage/damageController.js"
import { SelfSwarm } from "./selfSwarm.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class SelfSwarmObject {

    constructor(build = false){

        new InheritController().inherit(
            this,
            [
                SelfSwarm,
                Object,
            ],
            build
        )

        this.priority += 1

    }

    passBuildList = {

        "add_self_swarm_damage_to_weapons": (updateThis) => {

            updateThis.addWeaponObserver.add(
                (weapon) => {

                    Damage.addDamage(
                        weapon,
                        "self swarm",
                        0.1
                    )

                    Damage.addDamage(
                        weapon,
                        "self swarm production",
                        0.001
                    )

                }
            )

        },

    }

}