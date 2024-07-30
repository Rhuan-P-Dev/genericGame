import { ActivateController } from "../forAllShipUnits/activateController.js"
import { setFrameOut } from "../../frame/frameController.js"
import { EffectsController } from "../../effects/effectsController.js"
import { OutputObjectsConfig } from "./modifiers/weaponsModifiersController.js"
import { FactoryController } from "../factory/factoryController.js"
import { VectorController } from "../../generalUtils/vector.js"
import { ObjectActivatesController } from "../../objectController/objectActivatesController.js"
import { AnimationsController } from "../../graphics/animation/animationsController.js"
import { AIUtilsController } from "../../AI/utils/AIUtils.js"
import { CloneObjectController } from "../../generalUtils/cloneObject.js"
import { DamageController } from "../../damage/damageController.js"

// PROJECTILES
import { SmallBulletProjetile } from "../../object/projectiles/complex/smallBulletProjectile.js"
import { MissileProjetile } from "../../object/projectiles/complex/missileProjectile.js"
import { BlackHoleProjetile } from "../../object/projectiles/complex/blackHoleProjectile.js"
import { MineProjetile } from "../../object/projectiles/complex/mineProjectile.js"
import { MediumBulletProjetiles } from "../../object/projectiles/complex/mediumBulletProjectile.js"
import { MiniWorldProjectile } from "../../object/projectiles/complex/miniWorldProjectile.js"
import { ExplosiveSmallBulletProjetile } from "../../object/projectiles/complex/explosiveSmallBulletProjectile.js"
import { ExplosiveMediumBulletProjectile } from "../../object/projectiles/complex/explosiveMediumBulletProjectile.js"
import { DeathHand } from "../../object/projectiles/complex/deathHand.js"

var Activate = ""
var Effects = ""
var Vector = ""
var Factory = ""
var ObjectActivates = ""
var Animations = ""
var AIUtils
var CloneObject
var Damage


onInit(function(){

    Activate = new ActivateController()
    Effects = new EffectsController()
    Vector = new VectorController()
    Factory = new FactoryController()
    ObjectActivates = new ObjectActivatesController()
    Animations = new AnimationsController()
    AIUtils = new AIUtilsController()
    CloneObject = new CloneObjectController()
    Damage = new DamageController()

})

export class WeaponsController{

    ajustObject(weapon, object, config){

        Activate.basicAjustObject(weapon.owner, weapon, object)

        object.x += weapon.xOffset
        object.y += weapon.yOffset


        let triangle = Vector.triangleFactory(
            weapon.xMult - config.tempSpreadX,
            weapon.yMult - config.tempSpreadY,
        )

        let cosine_X = triangle.cosine - config.distortionX
        let sine_Y = triangle.sine - config.distortionY

        object.currentXVel += cosine_X * ( weapon.config.weapon.multVel + config.tempMultVel )
        object.currentYVel += sine_Y * ( weapon.config.weapon.multVel + config.tempMultVel )




        object.damage *= weapon.config.weapon.damageMult

        if(!weapon.hasModifier){
            object.lifeTime = weapon.lifeTime
        }


        if(weapon.damageTypes){

            for(let typeOfDamage in weapon.damageTypes){

                Damage.addDefense(
                    object,
                    "life",
                    typeOfDamage,
                    weapon.defenses[typeOfDamage]
                )

            }

            object.damageTypes = weapon.damageTypes
        }

        if(weapon.homing){

            object.searchPriority = weapon.searchPriority

        }



        if(weapon.effects){

            Effects.applyEffects(
                object,
                weapon.effects
            )

        }

        if(weapon.animations){

            Animations.applyAnimations(
                object,
                weapon.animations,
                true
            )

        }




        object.owner = weapon

    }

    activateEffect(object, activate, config){

        let minimalObject = AIUtils.getMinimalObject(object)

        minimalObject.x += activate.cosine * activate.range
        minimalObject.y += activate.sine * activate.range

        minimalObject.effects = {}

        let tempEffect = CloneObject.recursiveCloneAttribute(activate.effects[0].effect)

        tempEffect.params.object = minimalObject

        Effects.linkOwerToEffect(
            tempEffect.params,
            object
        )

        Effects.add(
            tempEffect.config.name,
            tempEffect.config.type,
            tempEffect.params,
            tempEffect.config
        )

        Weapons.deactivateEffect(minimalObject, (tempEffect.dellObjectTimer || 1) + 1)

    }

    deactivateEffect(effectObject, frames){

        setFrameOut(
            () => {
                Effects.removeAll(
                    effectObject
                )
                effectObject = null
            }, frames
        )

    }

    useWeapon(object, ID){

        let result = Activate.useActivate(object, ID)

        if(result.return){

            Weapons.processObjects(
                result.activate,
                result.return
            )

        }

    }

    processObjects(weapon, newObjects){

        for (let index = 0; index < newObjects.length; index++) {
            
            let newObject = newObjects[index].object
            let newObjectConfig = newObjects[index].config

            setFrameOut( () => {

                Weapons.ajustObject(weapon, newObject, newObjectConfig)

                Activate.addObject(newObject)

            }, newObjectConfig.interval)
    
        }

    }

    projectiles = {

        "small bullet": SmallBulletProjetile,
        "medium bullet": MediumBulletProjetiles,
        "simple missile": MissileProjetile,
        "black hole": BlackHoleProjetile,
        "simple mine": MineProjetile,
        "mini world": MiniWorldProjectile,
        "explosive small bullet": ExplosiveSmallBulletProjetile,
        "explosive medium bullet": ExplosiveMediumBulletProjectile,
        "death's hand": DeathHand

    }

    returnProjectiles(object, activate, config){

        let projectiles = []

        for (let index = 0; index < config.projectiles.objectClass.length; index++) {

            let tempConfig = {
                "statsMult": 0
            }

            tempConfig.objectClass = Weapons.projectiles[
                config.projectiles.objectClass[index]
            ]

            tempConfig.AI = config.projectiles.AI[index]

            tempConfig.behavior = config.projectiles.behavior

            let newObject = Factory.createObject(
                {},
                {},
                tempConfig
            )

            ObjectActivates.setActivates(newObject, config.projectiles.activates[index])

            projectiles.push({
                "object": newObject,
                "config": new OutputObjectsConfig()
            })
            
        }

        return projectiles

    }

}

var Weapons = new WeaponsController()