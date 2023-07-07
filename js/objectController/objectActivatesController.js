import { GameStateController } from "../gameState/gameStateController.js"
import { KeyBoardController } from "../keyboard/keyBoardController.js"
import { WeaponsController } from "../shipUnits/weapons/weaponsController.js"
import { WeaponsModifiersController } from "../shipUnits/weapons/modifiers/weaponsModifiersController.js"
import { ObjectCreatorController } from "./objectCreatorController.js"

var GameState = ""
var KeyBoard = ""
var Weapons = ""
var ObjectCreator = ""

var WeaponsModifiers = ""

onInit(function(){

    GameState = new GameStateController()
    KeyBoard = new KeyBoardController()
    Weapons = new WeaponsController()
    ObjectCreator = new ObjectCreatorController()

    WeaponsModifiers = new WeaponsModifiersController()

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
                object.activate(weapon.ID)
            })

            //WeaponsModifiers.addModifier(weapon, "spread")

            //WeaponsModifiers.addModifier(weapon, "shotgun")

            //WeaponsModifiers.addModifier(weapon, "burst")

            //WeaponsModifiers.addModifier(weapon, "machinegun")

            //WeaponsModifiers.addModifier(weapon, "growing")

            //ObjectCreator.giveObjectAI(weapon, ["ship_turret"])
            //GameState.addObject(weapon, true, false, false, false, false, false)

        }

        object.addActivate(weapon)

        //console.log(weapon)

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