import { WeaponsInfoController } from "./info/weaponsInfoController.js"
import { ActivateController } from "../forAllShipUnits/activateController.js"
import { setFrameOut } from "../../frame/frameController.js"
import { EffectsController } from "../../effects/effectsController.js"
import { CloneObjectController } from "../../generalUtils/cloneObject.js"
import { VectorController } from "../../generalUtils/vector.js"
import { AIController } from "../../AI/AIController.js"
import { OutputObjectsConfig } from "./modifiers/weaponsModifiersController.js"


// PROJECTILES
import { SmallBulletProjetile } from "../../object/projectiles/complex/smallBulletProjectile.js"
import { MissileProjetile } from "../../object/projectiles/complex/missileProjectile.js"
import { BlackHoleProjetile } from "../../object/projectiles/complex/blackHoleProjectile.js"
import { MineProjetile } from "../../object/projectiles/complex/mineProjectile.js"

var Activate = ""
var Effects = ""
var CloneObject = ""
var Vector = ""
var WeaponsInfo = ""
var AIC = ""

onInit(function(){

    Activate = new ActivateController()
    Effects = new EffectsController()
    CloneObject = new CloneObjectController()
    Vector = new VectorController()
    WeaponsInfo = new WeaponsInfoController()
    AIC = new AIController()

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





        if(weapon.homing){

            object.searchPriority = weapon.searchPriority

        }



        if(weapon.effects){

            this.applyEffects(
                object,
                weapon.effects
            )

        }




        object.owner = weapon

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
        "simple missile": MissileProjetile,
        "black hole": BlackHoleProjetile,
        "simple mine": MineProjetile,

    }

    returnProjectiles(object, activate, config){

        let projectiles = []

        for (let index = 0; index < config.projectiles.return.length; index++) {

            let newObject = config.projectiles.return[index]

            newObject = new Weapons.projectiles[newObject](true)

            if(typeof(config.projectiles.AI[index]) != "undefined"){

                AIC.giveAI(newObject, config.projectiles.AI[index])

            }

            projectiles.push({
                "object": newObject,
                "config": new OutputObjectsConfig()
            })
            
        }

        return projectiles

    }

    applyEffects(object, effects){

        for (let index = 0; index < effects.length; index++) {

            let currentEffect = effects[index]

            let global = CloneObject.recursiveCloneAttribute(currentEffect)

            let apply = global.apply

            let effect = global.effect

            effect.params.object = object

            this.applyEffect(
                effect,
                apply
            )
            
        }

    }

    applyEffect(
        effect,
        apply
    ){

        if(apply.apply){

            Effects.apply(
                apply.applyType,
                effect.config.name,
                effect.config.type,
                effect.params,
                effect.config,
            )

        }else{

            Effects.add(
                effect.config.name,
                effect.config.type,
                effect.params,
                effect.config,
            )

        }

    }

}

var Weapons = new WeaponsController()