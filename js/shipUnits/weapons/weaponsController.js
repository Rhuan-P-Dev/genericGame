import { ObjectCreatorController } from "../../objectController/objectCreatorController.js"
import { WeaponsInfoController } from "./info/weaponsInfoController.js"
import { SmallBulletProjetile } from "../../object/projectiles/smallBulletProjetile.js"
import { MissileProjetile } from "../../object/projectiles/missileProjetile.js"
import { ActivateController } from "../forAllShipUnits/activateController.js"
import { setFrameOut } from "../../frame/frameController.js"

var ObjectCreator = ""

var Activate = ""

onInit(function(){

    ObjectCreator = new ObjectCreatorController()

    Activate = new ActivateController()

})

export class WeaponsController{

    ajustObject(weapon, object, config){

        Activate.basicAjustObject(weapon.owner, object)

        object.lifeTime = weapon.lifeTime

        object.currentXVel = ( weapon.xMult - config.tempXSpread ) * ( weapon.config.multVel * config.tempMultVel )
        object.currentYVel = ( weapon.yMult - config.tempYSpread ) * ( weapon.config.multVel * config.tempMultVel )

        object.damage *= weapon.config.damageMult

        if(weapon.homing){

            object.searchPriority = weapon.searchPriority

        }

        object.owner = weapon

    }

    getAll(){
        return new WeaponsInfoController(true)
    }

    getInfo(weaponName){
        return new WeaponsInfoController(true)[weaponName]
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

        ObjectCreator.giveObjectAI(missile, ["missile_v2"])

        return missile
    
    }

}

var Weapons = new WeaponsController()