import { InheritController } from "../../../../../generalUtils/inherit.js"
import { DamageController } from "../../../../../damage/damageController.js" 
import { SelfSwarm } from "../../../../../object/uncommon/selfSwarm.js"
import { WeaponExtend } from "../../extend/weapon.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class SelfSwarmThreeSniper {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                WeaponExtend,
                SelfSwarm,
            ],
            build
        )

        this.name = "self swarm three sniper"

        this.cost = 20
        this.reload = 1.5*60

        this.lifeTime = 1*60

        this.config.weapon.multVel = 16
        this.config.weapon.damageMult = 0.5

        this.config.projectiles.objectClass = ["small bullet"]

        Damage.addDamage(this, "self swarm", 2)

        this.modifiersList = [
            "burst"
        ]

    }

}