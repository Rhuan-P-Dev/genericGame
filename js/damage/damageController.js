import { AIUtilsController } from "../AI/utils/AIUtils.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"

var AIUtils = ""
var ScreenRender = ""

onInit(function(){

    AIUtils = new AIUtilsController()
    ScreenRender = new ScreenRenderController()

})

export class DamageController {

    damageTypeTable = {
        "single": this.damageCalc,
        "radius": this.radiusCalc,
    }

    damage(attacker, victim){

        if(!attacker.damageConfig){
            this.damageCalc(attacker, victim)
            return
        }

        this.damageTypeTable[attacker.damageConfig.type](
            attacker,
            victim
        )

    }

    damageCalc(attacker, victim){

        let damage = (attacker.damage * victim.resistance) - victim.defense

        if(damage <= 0){return}

        victim.life -= damage

    }

    radiusCalc(attacker){

        ScreenRender.addDrawRequest(
            ScreenRender.drawCircle,
            {
                "x": attacker.x,
                "y": attacker.y,
                "radius": attacker.damageConfig.range,
            }
        )

        let allEnemyObject = AIUtils.returnArrayWithAlllObjectsOfTeams(
            attacker,
            {
                "maxDistance": attacker.damageConfig.range,
            }
        )

        for (let index = 0; index < allEnemyObject.length; index++) {

            let victim = allEnemyObject[index]

            Damage.damageCalc(attacker, victim)
            
        }

    }

}

var Damage = new DamageController()