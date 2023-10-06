import { ObjectCreatorController } from "../../objectController/objectCreatorController.js"
import { WeaponsInfoController } from "./info/weaponsInfoController.js"
import { SmallBulletProjetile } from "../../object/projectiles/smallBulletProjetile.js"
import { MissileProjetile } from "../../object/projectiles/missileProjetile.js"
import { ActivateController } from "../forAllShipUnits/activateController.js"
import { setFrameOut } from "../../frame/frameController.js"
import { EffectsController } from "../../effects/effectsController.js"
import { CloneObjectController } from "../../generalUtils/cloneObject.js"
import { VectorController } from "../../generalUtils/vector.js"

var ObjectCreator = ""
var Activate = ""
var Effects = ""
var CloneObject = ""
var Vector = ""
var WeaponsInfo = ""

onInit(function(){

    ObjectCreator = new ObjectCreatorController()
    Activate = new ActivateController()
    Effects = new EffectsController()
    CloneObject = new CloneObjectController()
    Vector = new VectorController()
    WeaponsInfo = new WeaponsInfoController()

})

export class WeaponsController{

    ajustObject(weapon, object, config){

        Activate.basicAjustObject(weapon.owner, object)

        object.lifeTime = weapon.lifeTime

        let triangle = Vector.triangleFactory(weapon.xMult - config.tempXSpread, weapon.yMult- config.tempYSpread)

        let cosine_X = triangle.cosine // - "DISTORSION"
        let sine_Y = triangle.sine // - "DISTORSION"

        object.currentXVel = ( cosine_X ) * ( weapon.config.multVel + config.tempMultVel )
        object.currentYVel = ( sine_Y ) * ( weapon.config.multVel + config.tempMultVel )

        object.damage *= weapon.config.damageMult

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

    getAll(){
        return WeaponsInfo.getAll()
    }

    getInfo(weaponName){

        return WeaponsInfo.build(weaponName)

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

        if(newObjects.length == undefined){

            let tempConfig = {
                "tempXSpread": 0,
                "tempYSpread": 0,
                "tempMultVel": 1,
                "interval": 1,
            }

            Weapons.ajustObject(weapon, newObjects, tempConfig)

            Activate.addObject(newObjects)

            return

        }

        for (let index = 0; index < newObjects.length; index++) {
            
            let newObject = newObjects[index].object
            let newObjectConfig = newObjects[index].config

            setFrameOut( () => {

                Weapons.ajustObject(weapon, newObject, newObjectConfig)

                Activate.addObject(newObject)

            }, newObjectConfig.interval)
    
        }

    }

    createShoot(){

        return new SmallBulletProjetile()

    }

    createMissile(object){

        let missile = new MissileProjetile()

        missile.xMult = object.xMult
        missile.yMult = object.yMult

        missile.updateCircleStats(missile)

        ObjectCreator.giveObjectAI(missile, ["missileV1"])

        return missile
    
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
                effect.name,
                effect.type,
                effect.params,
                effect.config,
            )

        }

    }

}

var Weapons = new WeaponsController()