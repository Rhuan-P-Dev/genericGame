import { AIUtilsController } from "../AI/utils/AIUtils.js"
import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { CustomMathController } from "../generalUtils/math.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { ExplosionDamage } from "./damageTypes/explosion.js"

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
    }

    schedulerTypeTable = {
        "linear": this.linear,
        "linearReverse": this.linearReverse,
        "uniform": this.uniform
    }

    doDamage(params){

        this.damageTypeTable[params.object.damageConfig.type](
            params.object,
            params.otherObject
        )

    }

    damageCalc(attacker, victim){

        let damage = attacker.damage
        let bokedDamage = attacker.damage

        if(attacker.original){
            attacker = attacker.original
        }

        let master = attacker

        while(master.owner){

            master = master.owner

        }

        victim.onDamage.run({
            "otherObjectMaster": master,
            "otherObject": attacker,
            "object": victim,
            "damage": bokedDamage,
            "calcDamage": damage,
        })

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

        let mult = new CustomMathController().linearReverse(
            AIUtils.getDistanceOfObjects(attacker, victim),
            attacker.damageConfig.range,
        )

        mult += new CustomMathController().linear(
            attacker.width,
            attacker.damageConfig.range
        )

        mult += new CustomMathController().linear(
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

    explosionDamageShell(object){

        let shell = {}

        shell.damageConfig = new ExplosionDamage().damageConfig
        
        shell.damage = object.damage

        shell.ID = object.ID
        shell.team = object.team

        shell.width = object.width
        
        shell.x = object.x
        shell.y = object.y

        return shell

    }

}

var Damage = new DamageController()