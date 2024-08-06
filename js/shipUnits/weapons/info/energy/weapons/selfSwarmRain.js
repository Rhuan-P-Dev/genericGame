import { InheritController } from "../../../../../generalUtils/inherit.js"
import { DamageController } from "../../../../../damage/damageController.js" 
import { SelfSwarm } from "../../../../../object/uncommon/selfSwarm.js"
import { WeaponExtend } from "../../extend/weapon.js"

var Damage

onInit(function(){

    Damage = new DamageController()

})

export class SelfSwarmRain {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                WeaponExtend,
                SelfSwarm,
            ],
            build
        )

        this.name = "self swarm rain"

        this.cost = 20
        this.reload = 5*60

        this.lifeTime = 3*60

        this.config.weapon.multVel = 6
        this.config.weapon.damageMult = 0.25

        this.config.projectiles.objectClass = ["small bullet","small bullet","small bullet","small bullet","small bullet","small bullet","small bullet","small bullet","small bullet"]

        Damage.addDamage(this, "self swarm", 2)

        this.modifiersList = [
            "mid widen",
            "burst",
        ]

    }

}