import { AIUtilsController } from "../AI/utils/AIUtils.js"
import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { MathController } from "../generalUtils/math.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"

var AIUtils = ""
var ScreenRender = ""
var CloneObject = ""

onInit(function(){

    AIUtils = new AIUtilsController()
    ScreenRender = new ScreenRenderController()
    CloneObject = new CloneObjectController()

})

export class DamageController {

    damageTypeTable = {
        "single": this.damageCalc,
        "radius": this.radiusCalc,
        "illusion": () => {},
    }

    schedulerTypeTable = {
        "linear": this.linear,
        "linearReverse": this.linearReverse,
        "uniform": this.uniform
    }

    damage(params){

        if(!params.object.damageConfig){
            this.damageCalc(params.object, params.victim)
            return
        }

        this.damageTypeTable[params.object.damageConfig.type](
            params.object,
            params.otherObject
        )

    }

    damageCalc(attacker, victim){

        let damage = (attacker.damage * victim.resistance) - victim.defense

        if(damage <= 0){return}

        victim.life -= damage

        victim.onDamage(
            {
                "otherObject": attacker,
                "object": victim,
                "calcDamage": damage,
                "damage": attacker.damage
            }
        )

    }

    radiusCalc(attacker){

        ScreenRender.addDrawRequest(
            {
                "func":ScreenRender.drawCircle,
                "params":{
                    "x": attacker.x,
                    "y": attacker.y,
                    "radius": attacker.damageConfig.range,
                },
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

            let attackerBoked = Damage.schedulerTypeTable[attacker.damageConfig.scheduler](
                attacker,
                victim
            )

            Damage.damageCalc(attackerBoked, victim)
            
        }

    }

    boke(object){
    
        let boke = CloneObject.cloneSimple(object)

        boke.original = object

        return boke

    }

    linear(attacker, victim){

    }

    linearReverse(attacker, victim){

        let attackerBoked = Damage.boke(attacker)
        //let victimBoked = Damage.boke(victim)

        let mult = new MathController().linearReverse(
            AIUtils.getDistanceOfObjects(attacker, victim),
            attacker.damageConfig.range,
        )

        mult += new MathController().linear(
            attacker.width,
            attacker.damageConfig.range
        )

        mult += new MathController().linear(
            victim.width,
            attacker.damageConfig.range
        )

        if(mult > 1){
            mult = 1
        }

        attackerBoked.damage *= mult

        return attackerBoked

    }

    uniform(attacker, victim){

        return Damage.boke(attacker)

    }

}

var Damage = new DamageController()