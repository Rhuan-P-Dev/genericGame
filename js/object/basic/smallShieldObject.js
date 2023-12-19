import { InheritController } from "../../generalUtils/inherit.js"
import { ConsumeStatsController } from "../../misc/consumeStatsController.js"
import { ShieldObject } from "./shieldObject.js"

var ConsumeStats = ""

onInit(function(){

    ConsumeStats = new ConsumeStatsController()

})

export class SmallShieldObject {

    constructor(build = false){
        
        new InheritController().inherit(
            this,
            [
                ShieldObject
            ],
            build
        )

        this.shield /= 5
        this.maxShield /= 5
        this.shieldRegen /= 5

    }

}