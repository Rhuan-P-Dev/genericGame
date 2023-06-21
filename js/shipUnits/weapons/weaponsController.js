import { ObjectCreatorController } from "../../objectController/objectCreatorController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { MovableObject } from "../../object/movableObject.js"
import { Object } from "../../object/object.js"

var GameState = ""
var ObjectCreator = ""

onInit(function(){

    GameState = new GameStateController()
    ObjectCreator = new ObjectCreatorController()

})

export class WeaponsController{

    weapons = {
        "batchMissile": {
            "name": "batchMissile",
            "cost": 30,
            "type": "long",
            "range": 550,
            "func": this.batchMissile,
            "callBack": this.useWeapon,
        },
        "shoot": {
            "name": "shoot",
            "cost": 5,
            "type": "medium",
            "range": 390,
            "func": this.shoot,
            "callBack": this.useWeapon,
        },
        "shotgun": {
            "name": "shotgun",
            "cost": 30,
            "type": "short",
            "range": 160,
            "func": this.shotgun,
            "callBack": this.useWeapon,
        },
        "sniper": {
            "name": "sniper",
            "cost": 20,
            "type": "very long",
            "range": 730,
            "func": this.sniper,
            "callBack": this.useWeapon,
        }
    }

    getAllWeapons(){
        return this.weapons
    }

    getWeaponInfo(weaponName){
        return Weapons.weapons[weaponName]
    }

    useWeapon(object, weaponName){
        let weapon = Weapons.getWeaponInfo(weaponName)

        let cost = weapon.cost

        if(object.energy >= cost){
            object.energy -= cost

            weapon.func(object)
            
        }

    }

    createMissile(object){

        let missile = new MovableObject()

        missile.ID = randomUniqueID()

        missile.width /= 2
        missile.height /= 2

        missile.stepMult *= 5
        missile.xStepMult *= 5
        missile.yStepMult *= 5

        missile.maxVel *= 1.25
        missile.vel *= 2

        missile.maxLife = 15
        missile.life = 20

        missile.lifeTime = 150

        missile.damage = 30

        missile.team = object.team
        missile.x = object.x
        missile.y = object.y
        missile.color = object.color
        missile.xMult = object.xMult
        missile.yMult = object.yMult

        ObjectCreator.giveObjectAI(missile, ["missile_v2"])

        return missile

    }

    batchMissile(object){

        let missiles = {}
        
        for (let index = 0; index < 4; index++) {
            let tempMissile = Weapons.createMissile(object)
            missiles[tempMissile.ID] = tempMissile
        }

        for (let missileName in missiles) {
            let missile = missiles[missileName]

            missile.currentXVel = object.xMult - randomFloat(-0.5, 0.5)
            missile.currentYVel = object.yMult - randomFloat(-0.5, 0.5)

            missile.currentXVel *= 2
            missile.currentYVel *= 2

            GameState.addObject(missile, true)
        }

    }

    createShoot(object){

        let shoot = new Object()

        shoot.width /= 3
        shoot.height /= 3
        shoot.x = object.x
        shoot.y = object.y
        shoot.team = object.team
        shoot.color = object.color
        shoot.ID = randomUniqueID()

        shoot.lifeTime = 50

        shoot.damage = 10

        shoot.currentXVel = (10 * object.xMult)
        shoot.currentYVel = (10 * object.yMult)
        
        ObjectCreator.giveObjectAI(shoot, ["mine"])

        return shoot

    }

    shoot(object){

        let shoot = Weapons.createShoot(object)

        shoot.currentXVel = object.xMult - randomFloat(-0.2, 0.2)
        shoot.currentYVel = object.yMult - randomFloat(-0.2, 0.2)

        shoot.currentXVel *= 7
        shoot.currentYVel *= 7

        GameState.addObject(shoot, true)

    }

    sniper(object){

        let shoot = Weapons.createShoot(object)

        shoot.currentXVel *= 1.5
        shoot.currentYVel *= 1.5

        shoot.damage *= 6

        GameState.addObject(shoot, true)

    }

    shotgun(object){

        let shoots = {}
        
        for (let index = 0; index < 20; index++) {
            let tempShoot = Weapons.createShoot(object)
            shoots[tempShoot.ID] = tempShoot
        }

        for (let shootName in shoots) {
            let shoot = shoots[shootName]

            shoot.currentXVel = object.xMult - randomFloat(-0.3, 0.3)
            shoot.currentYVel = object.yMult - randomFloat(-0.3, 0.3)

            shoot.lifeTime = 15
        
            shoot.currentXVel *= 10
            shoot.currentYVel *= 10

            shoot.damage = 30

            GameState.addObject(shoot, true)
        }

    }

}

var Weapons = new WeaponsController()