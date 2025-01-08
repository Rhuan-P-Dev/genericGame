import { AIUtilsController } from "../utils/AIUtils.js"
import { CustomMathController } from "../../generalUtils/math.js"
import { CoreAIController } from "./coreAIController.js"
import { ActivateController } from "../../shipUnits/forAllShipUnits/activateController.js"
import { DamageController } from "../../damage/damageController.js"

var AIUtils
var CustomMath
var CoreAI
var Activate
var Damage

onInit(function(){

    AIUtils = new AIUtilsController()
    CustomMath = new CustomMathController()
    CoreAI = new CoreAIController()
    Activate = new ActivateController()
    Damage = new DamageController()

})

export class GetSignalStrengthController {

    getActionStrength(params, AIType, core){

        let strength = 1

        if(this["get" + firstLetterUppercase(AIType) + "Strength"]){

            strength = (
                this["get" + firstLetterUppercase(AIType) + "Strength"](
                    params,
                    strength,
                    core
                )
            )

        }

        strength = this.getGenericStrength(
            AIType,
            strength,
            core,
        )

        return strength

    }

    getGenericStrength(AIType, strength = 1, core){

        let finalTempStrength = AIActionMult[AIType]?.reduce((maxStrength, typeOfCoreAspect) => {
            let tempStrength = core[typeOfCoreAspect] ?? 1
            return Math.max(maxStrength ?? tempStrength, tempStrength)
        }, undefined) ?? 1

        return strength * finalTempStrength

    }

    getGenericMovimentationStrength(params, strength = 1, core){

        strength *= 1000

        return strength

    }

    getMissileV1Strength(params, strength = 1, core){

        strength = this.getGenericMovimentationStrength(params, strength, core)

        strength *= params.target.maxLife / params.target.life.get()
        strength *= params.object.life.get() / params.object.maxLife

        strength *= params.target.maxEnergy / params.target.energy

        strength *= (MID_RANGE * core.approximation) / params.distance

        return strength

    }

    getEscortAllyStrength(params, strength = 1, core){

        strength = this.getGenericMovimentationStrength(params, strength, core)

        strength *= params.target.maxLife / params.target.life.get()
        strength *= params.object.maxLife / params.object.life.get()

        strength *= (params.target.maxEnergy / params.target.energy) / 2
        strength *= (params.object.maxEnergy / params.object.energy) / 2

        strength *= params.distance / (MID_RANGE / core.approximation)

        return strength

    }

    getMovableStrength(params, strength = 1, core){

        strength = this.getGenericMovimentationStrength(params, strength, core)

        strength *= params.object.life.get() / params.object.maxLife

        strength *= params.target.maxLife / params.target.life.get()

        strength *= CustomMath.linearReverse(
            params.distance,
            MAX_RANGE / core.approximation
        )

        return strength

    }

    getFleeStrength(params, strength = 1, core) {
        strength = this.getGenericMovimentationStrength(params, strength, core)
        strength *= params.object.maxLife / params.object.life.get()

        return strength

    }

    getActivateUnavailableStrength(params, strength, core){

        if(
            params.activate.reloadTemp > 0
            ||
            Activate.get(
                params.object,
                params.activate,
                "activate cost"
            ) > Activate.get(
                params.object,
                params.activate,
                "object resource"
            )
        ){

            strength = this.getGenericStrength(
                "activateUnavailable",
                strength,
                core,
            )

            strength *= Math.min(
                alwaysPositive(30 / params.activate.reloadTemp) + 1,
                1
            )

            strength *= Math.min(
                Activate.get(
                    params.object,
                    params.activate,
                    "object resource / activate cost"
                ),
                1
            )

        }

        return strength

    }

    getUseActivatesStrength(params, strength = 1, core){

        if(
            Activate.get(
                params.object,
                params.activate,
                "object max resource"
            )
            &&
            Activate.get(
                params.object,
                params.activate,
                "activate cost"
            ) > Activate.get(
                params.object,
                params.activate,
                "object max resource"
            )
        ){
            return 0
        }

        strength = this.getActivateUnavailableStrength(
            params,
            strength,
            core
        )

        strength = this.getGenericStrength(
            params.activate.type,
            strength,
            core
        )

        strength = activatesTypesTable[
            params.activate.type
        ](
            params,
            strength,
            core
        )

        let finalTempStrength = params.activate.subType?.reduce((maxStrength, subType) => {
            let tempStrength = activatesSubTypesTable[subType]
              ? activatesSubTypesTable[subType](params, strength, core)
              : 1
          
            return Math.max(maxStrength ?? tempStrength, tempStrength)
        }, undefined) ?? 1

        strength *= finalTempStrength

        if(strength < core.minimalActionConfidence){
            return 0
        }
        
        strength *= Activate.get(
            params.object,
            params.activate,
            "object resource / object max resource"
        )

        strength *= Activate.get(
            params.object,
            params.activate,
            "object resource / activate cost"
        )

        return strength

    }

    getWeaponStrength(params, strength = 1){

        if(
            params.activate.range < params.distance
        ){
            return 0
        }

        strength *= params.activate.range / params.distance

        return strength

    }

    getDefenseStrength(params, strength = 1){

        strength *= params.object.maxLife / params.object.life.get()

        return strength

    }

    getFactoryStrength(params, strength = 1){

        return strength

    }

    getSpecialStrength(params, strength = 1){

        return strength

    }

    getMovementStrength(params, strength = 1, core){

        let distance = (
            CoreAI.get(params.object,"offensiveSearch","distance")
            ??
            CoreAI.get(params.object,"fleeSearch","distance")
            ??
            CoreAI.get(params.object,"allySearch","distance")
        )

        let signal = CoreAI.get(params.object,"fleeSearch","distance") ? -1 : 1

        if(
            distance === undefined
        ){
            return strength
        }

        if(
            distance < VAST_RANGE / core.approximation
            &&
            signal === undefined
        ){
            return 0
        }

        if(signal < 0){
            strength *= (VAST_RANGE / core.approximation) / distance
        }else{
            strength *= distance / (VAST_RANGE / core.approximation)
        }

        return strength

    }

    getRegenStrength(params, strength = 1, core){

        strength *= (params.object.maxLife / params.object.life.get()) - 1

        return strength

    }

    getDodgeStrength(params, strength = 1, core){

        /*

            sometimes this is overpower

        */

        if(
            !CoreAI.get(params.object,"dodge")
            ||
            !CoreAI.get(params.object,"dodge","target")
        ){
            return 0
        }

        let distance = AIUtils.getDistanceOfObjects(
            AIUtils.getFutureOf(params.object, 1),
            AIUtils.getFutureOf(
                CoreAI.get(params.object,"dodge","target"),
                1
            )
        )

        if(
            distance < params.object.width + CoreAI.get(params.object,"dodge","target").width
        ){

            let damage = Damage.getMaxDamage(
                params.object,
                CoreAI.get(params.object,"dodge","target", true),
                "life"
            )

            if(
                damage < 0
            ){
                return 0
            }

            strength *= params.object.maxLife / params.object.life.get()

            strength *= (
                (
                    damage / params.object.life.get()
                ) + 1
            ) * 2//3

            return strength

        }else{
            return 0
        }

    }

    getSuicideStrength(params, strength, core){

        strength *= CustomMath.linearReverse(
            params.object.life.get(),
            params.object.maxLife
        )

        strength *= CustomMath.linearReverse(
            params.object.energy,
            params.object.maxEnergy
        )

        if(
            params.activate
            &&
            CoreAI.get(params.object,"offensiveSearch","distance")
            &&
            params.activate.range > CoreAI.get(params.object,"offensiveSearch","distance")
            &&
            params.object.life.get() <= params.object.maxLife * (0.15 / core.defensive)
        ){

            strength *= (params.object.maxLife * (0.15 / core.defensive)) / params.object.life.get()

            return strength * 2
        }

        return strength

    }

    getGenericTermBenefitStrength(params, strength, core){

        strength *= params.object.life.get() / params.object.maxLife

        return strength

    }

    getLongTermBenefitStrength(params, strength, core){

        return GetSignalStrength.getGenericTermBenefitStrength(params, strength, core)

    }

    getMidTermBenefitStrength(params, strength, core){

        return GetSignalStrength.getGenericTermBenefitStrength(params, strength, core)

    }

    getShortTermBenefitStrength(params, strength, core){

        return GetSignalStrength.getGenericTermBenefitStrength(params, strength, core)

    }

    getLifeRiskBuffStrength(params, strength, core){

        strength *= (params.object.life.get() / params.object.maxLife) ** 8

        return strength

    }

    getEvasiveStrength(params, strength, core){

        strength *= (params.object.maxLife / params.object.life.get()) / 2

        return strength

    }

    getTankStrength(params, strength, core){

        strength *= (params.object.life.get() / params.object.maxLife) * 2

        return strength

    }

    getLifeGuardStrength(params, strength, core){

        if(
            params.object.life.get() <= params.object.maxLife * (0.25 * core.defensive)
        ){
            strength *= 3
            strength *= (params.object.maxLife * (0.25 * core.defensive)) / params.object.life.get()
        }else{
            strength = 0
        }

        return strength

    }

    getDirectionalDefenseStrength(params, strength, core){

        if(
            !CoreAI.get(params.object,"directionalDefense")
            ||
            !CoreAI.get(params.object,"directionalDefense","targets")
        ){
            return 0
        }

        let targets = CoreAI.get(params.object,"directionalDefense","targets", true)

        for(let targetIndex in targets){

            let target = targets[targetIndex]

            let distance = AIUtils.getDistanceOfObjects(
                AIUtils.getFutureOf(params.object, 1),
                AIUtils.getFutureOf(target, 1)
            )

            if(distance > params.activate.config.range){continue}

            if(
                AIUtils.isInObjectAngle(
                    params.object,
                    target,
                    params.activate.config.angle,
                    params.activate.config.angleDistortion
                )
            ){

                let damage = Damage.getMaxDamage(
                    params.object,
                    target,
                    "life"
                )
    
                if(
                    damage < 0
                ){
                    continue
                }

                strength *= params.object.maxLife / params.object.life.get()

                strength *= (
                    damage / params.object.life.get()
                ) + 1

                strength *= params.activate.config.range / distance

            }

        }

        return strength - 1

    }

    getShieldStrength(params, strength, core){

        if(
            params.object.shield === undefined
            ||
            params.object.shield - params.object.maxShield === 0
        ){return 0}

        strength *= CustomMath.linearReverse(
            params.object.shield,
            params.object.maxShield
        ) + 1

        strength *= (

            params.activate.config.stats.shield / Activate.get(
                params.object,
                params.activate,
                "activate cost"
            )

        ) * 2

        if(core.shieldPriority !== undefined){
            strength *= core.shieldPriority
        }

        return strength

    }

    getFortificationStrength(params, strength, core){

        strength *= Activate.get(
            params.object,
            params.activate,
            "activate cost per second"
        ) * 0.5

        return Math.min(
            strength,
            2 * core.defensive
        )

    }

    getAreaSupportStrength(params, strength, core){

        if(
            !CoreAI.get(params.object,"areaSupport")
            ||
            !CoreAI.get(params.object,"areaSupport","targets")
        ){
            return 0
        }

        let targets = CoreAI.get(params.object,"areaSupport","targets", true)

        for(let targetIndex in targets){

            let target = targets[targetIndex]

            let distance = AIUtils.getDistanceOfObjects(
                params.object,
                target,
            )

            if(
                distance > params.activate.config.range / core.approximation
            ){continue}

            strength *= target.maxLife / target.life.get()
            strength *= target.maxEnergy / target.energy


        }

        return Math.min(
            strength - 1,
            2 * core.support
        )

    }

    getAreaHealStrength(params, strength = 1, core){

        strength = GetSignalStrength.getAreaSupportStrength(params, strength, core)

        if(
            !CoreAI.get(params.object,"areaSupport")
            ||
            !CoreAI.get(params.object,"areaSupport","targets")
        ){
            return 0
        }

        let targets = CoreAI.get(params.object,"areaSupport","targets", true)

        for(let targetIndex in targets){

            let target = targets[targetIndex]

            let distance = AIUtils.getDistanceOfObjects(
                params.object,
                target,
            )

            if(
                distance > params.activate.config.range / core.approximation
            ){continue}

            if(target.maxLife > target.life.get()){
                return strength*(core.support+1)
            }

        }

        return 0

    }

}

const GetSignalStrength = new GetSignalStrengthController()

const activatesTypesTable = {
    "weapon": GetSignalStrength.getWeaponStrength,
    "factory": GetSignalStrength.getFactoryStrength,
    "special": GetSignalStrength.getSpecialStrength,
    "defense": GetSignalStrength.getDefenseStrength
}

const activatesSubTypesTable = {
    "regen": GetSignalStrength.getRegenStrength,
    "movement": GetSignalStrength.getMovementStrength,
    "dodge": GetSignalStrength.getDodgeStrength,
    "suicide": GetSignalStrength.getSuicideStrength,
    "longTermBenefit": GetSignalStrength.getLongTermBenefitStrength,
    "midTermBenefit": GetSignalStrength.getMidTermBenefitStrength,
    "shortTermBenefit": GetSignalStrength.getShortTermBenefitStrength,
    "lifeRiskBuff": GetSignalStrength.getLifeRiskBuffStrength,
    "evasive": GetSignalStrength.getEvasiveStrength,
    "tank": GetSignalStrength.getTankStrength,
    "lifeGuard": GetSignalStrength.getLifeGuardStrength,
    "directionalDefense": GetSignalStrength.getDirectionalDefenseStrength,
    "shield": GetSignalStrength.getShieldStrength,
    "fortification": GetSignalStrength.getFortificationStrength,
    "areaSupport": GetSignalStrength.getAreaSupportStrength,
    "areaHeal": GetSignalStrength.getAreaHealStrength,
}

const AIActionMult = {
    "missileV1": [
        "offensive"
    ],
    "flee": [
        "defensive"
    ],
    "movable": [
        "offensive"
    ],
    "escortAlly": [
        "defensive",
        "support",
    ],
    //"useActivates": [],

    "weapon": [
        "offensive",
    ],
    "defense": [
        "defensive",
    ],
    "factory": [
        //"offensive",
        //"defensive",
        "support",
    ],
    "special": [
        "support"
    ],

    "dodge": [
        "defensive",
    ],

    "directionalDefense": [
        "defensive",
    ],

    "longTermBenefit": [
        "long buff"
    ],

    "midTermBenefit": [
        "mid buff"
    ],

    "shortTermBenefit": [
        "short buff"
    ],

    "activateUnavailable": [
        "patience"
    ],

    "lifeRiskBuff": [
        "offensive",
    ],

    "evasive": [
        "defensive",
    ],

    "tank": [
        "defensive",
        "support",
    ],

    "lifeGuard": [
        "defensive",
    ],

    "regen": [
        "defensive",
    ],

    "shield": [
        "defensive",
    ],

    "fortification": [
        "defensive",
    ],

    "areaSupport": [
        "support",
    ],

    "areaHeal": [
        "support",
    ],

}