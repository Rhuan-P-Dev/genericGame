import { GameStateController } from "../gameState/gameStateController.js"
import { ObjectCreatorController } from "../objectController/objectCreatorController.js"
import { DefenseController } from "../shipUnits/defense/defenseController.js"
import { FactoryController } from "../shipUnits/factory/factoryController.js"
import { SpecialController } from "../shipUnits/special/specialController.js"
import { WeaponsController } from "../shipUnits/weapons/weaponsController.js"


var GameState = ""
var ObjectCreator = ""
var Weapons = ""
var Special = ""
var Defense = ""
var Factory = ""

onInit(function(){

    GameState = new GameStateController()
    ObjectCreator = new ObjectCreatorController()
    Weapons = new WeaponsController()
    Special = new SpecialController()
    Defense = new DefenseController()
    Factory = new FactoryController()

})

export class ShipLogicController{

    getPlayer(){
        return GameState.getObject("player")
    }

    objectExist(object){
        if(object){
            return true
        }else{
            return false
        }
    }

    useAbilityOne(object){
        Weapons.useWeapon(object, "batchMissile")
    }

    useAbilityTwo(object){
        Weapons.useWeapon(object, "shoot")
    }

    useAbilityThree(object){
        Special.makeWeakClone(object)
    }

    useAbilityFour(object){
        Defense.regen(object)
    }

    useAbilityFive(object){
        Weapons.useWeapon(object, "shotgun")
    }

    useAbility6(object){
        Special.lvUp(object)
    }

    useAbility7(object){
        Factory.createTurret(object)
    }

    useAbility8(object){
        Weapons.useWeapon(object, "sniper")
    }

}

var ShipLogic = new ShipLogicController()