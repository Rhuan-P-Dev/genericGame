import { InheritController } from "../../../../generalUtils/inherit.js"
import { SmallBulletCluster1Effect } from "../effects/smallBulletCluster1Effect.js"
import { WeaponExtend } from "../extend/weapon.js"

export class SmallBulletCluster1 {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                SmallBulletCluster1Effect,
                WeaponExtend,
            ],
            build
        )

        this.name = "small bullet cluster 1"
        this.cost = 50
        this.reload = 1*60

        this.lifeTime = 50

        this.config.weapon.multVel = 5
        this.config.weapon.damageMult = 2

        this.config.projectiles.objectClass = ["medium bullet"]

    }

}