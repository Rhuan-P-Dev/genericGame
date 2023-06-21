import { GameStateController } from "../gameState/gameStateController.js"
import { KeyBoardController } from "../keyboard/keyBoardController.js"
import { WeaponsController } from "../shipUnits/weapons/weaponsController.js"

var GameState = ""
var KeyBoard = ""
var Weapons = ""

onInit(function(){

    GameState = new GameStateController()
    KeyBoard = new KeyBoardController()
    Weapons = new WeaponsController()

})

export class ObjectActivatesController{

    giveOffensiveActivate(object, weaponName = "random"){

        let weapon = undefined

        if(weaponName == "random"){
            weapon = ObjectActivates.giveRandomOffensiveActivate()
        }else{
            weapon = ObjectActivates.returnOffensiveActivate(weaponName)
        }

        if(GameState.getPlayer().ID == object.ID){

            KeyBoard.updateKeyBoardKeys(() => {
                object.activate(weapon.name)
            })

        }

        object.addActivate(weapon)

    }
    
    giveRandomOffensiveActivate(){

        let allWeapons = Weapons.getAllWeapons()

        let weaponIndex = randomInteger(0,Object.keys(allWeapons).length-1)

        let weaponName = Object.keys(allWeapons)[weaponIndex]

        return ObjectActivates.returnOffensiveActivate(weaponName)

    }

    returnOffensiveActivate(weaponName){

        return Weapons.getWeaponInfo(weaponName)

    }

}

var ObjectActivates = new ObjectActivatesController()