import { ObjectCreatorController } from "../../objectController/objectCreatorController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { MovableObject } from "../../object/movableObject.js"
import { Object } from "../../object/object.js"
import { WeaponsInfoController } from "./info/weaponsInfoController.js"

var GameState = ""
var ObjectCreator = ""

onInit(function(){

    GameState = new GameStateController()
    ObjectCreator = new ObjectCreatorController()

})

export class WeaponsController{

    ajustObject(weapon, object, config){

        object.ID = randomUniqueID()
        object.team = weapon.owner.team

        object.color = weapon.owner.color

        object.lifeTime = weapon.lifeTime

        object.x = weapon.owner.x
        object.y = weapon.owner.y

        object.currentXVel = ( weapon.xMult - config.tempXSpread ) * ( weapon.config.multVel * config.tempMultVel )
        object.currentYVel = ( weapon.yMult - config.tempYSpread ) * ( weapon.config.multVel * config.tempMultVel )

        object.damage *= weapon.config.damageMult

        if(!weapon.prioritys){
            return
        }

        object.prioritys = weapon.prioritys
        
    }

    getAllWeapons(){
        return new WeaponsInfoController(true)
    }

    getWeaponInfo(weaponName){
        return new WeaponsInfoController(true)[weaponName]
    }

    useWeapon(object, ID){

        let weapon = object.activates[ID]

        let cost = weapon.cost

        let newObjects = {}

        if(object.energy >= cost && weapon.reloadTemp <= 0){

            object.energy -= cost

            weapon.reloadTemp = weapon.reload

            if(weapon.config){
                newObjects = weapon.func(object, weapon)
            }else{
                newObjects = weapon.func(object)
            }

            Weapons.processObjects(weapon, newObjects)

        }

    }

    processObjects(weapon, newObjects){

        if(!newObjects){return}

        if(newObjects.length == undefined){

            Weapons.addObjects(weapon, newObjects, {
                "tempXSpread": 0,
                "tempYSpread": 0,
                "tempMultVel": 1
            })

        }else{

            for (let index = 0; index < newObjects.length; index++) {
            
                let newObject = newObjects[index].object
                let newObjectConfig = newObjects[index].config
    
                setTimeout( () => {

                    Weapons.addObjects(weapon, newObject, newObjectConfig)
    
                }, newObjectConfig.interval)
    
            }

        }
    

    }

    addObjects(weapon, object, config){

        Weapons.ajustObject(weapon, object, config)
        GameState.addObject(object, true)
        
    }

    createShoot(){

        let shoot = new Object()

        shoot.width /= 3
        shoot.height /= 3

        shoot.damage = 10
        
        ObjectCreator.giveObjectAI(shoot, ["mine"])

        return shoot

    }

    createMissile(object){

        let missile = new MovableObject()

        missile.width = 2
        missile.height = 2

        missile.stepMult *= 5
        missile.xStepMult *= 5
        missile.yStepMult *= 5

        missile.maxVel *= 1.5
        missile.vel *= 2

        missile.maxLife = 15
        missile.life = 15

        missile.lifeTime = 150

        missile.damage = 30

        missile.xMult = object.xMult
        missile.yMult = object.yMult

        //ObjectCreator.giveObjectAI(missile, ["missile_v2"])
        ObjectCreator.giveObjectAI(missile, ["missile_v3"])

        return missile
    
    }

}

var Weapons = new WeaponsController()