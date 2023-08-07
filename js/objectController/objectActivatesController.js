import { GameStateController } from "../gameState/gameStateController.js"
import { KeyBoardController } from "../keyboard/keyBoardController.js"
import { WeaponsController } from "../shipUnits/weapons/weaponsController.js"
import { WeaponsModifiersController } from "../shipUnits/weapons/modifiers/weaponsModifiersController.js"
import { ObjectCreatorController } from "./objectCreatorController.js"
import { SpecialController } from "../shipUnits/special/specialController.js"
import { FactoryController } from "../shipUnits/factory/factoryController.js"
import { DefenseController } from "../shipUnits/defense/defenseController.js"

var GameState = ""
var KeyBoard = ""
var ObjectCreator = ""

var WeaponsModifiers = ""

onInit(function(){

    GameState = new GameStateController()
    KeyBoard = new KeyBoardController()
    ObjectCreator = new ObjectCreatorController()

    WeaponsModifiers = new WeaponsModifiersController()

})

export class ObjectActivatesController{

    loaders = {
        "weapon": new WeaponsController(),
        "special": new SpecialController(),
        "factory": new FactoryController(),
        "defense": new DefenseController()
    }

    giveActivate(object, typeOfLoader = "random", activateName = "random"){

        let activate = undefined

        if(activateName == "random"){
            activate = this.returnRandomActivate(typeOfLoader)
        }else{
            activate = this.returnActivate(typeOfLoader, activateName)
        }

        if(activate){

            if(GameState.getPlayer().ID == object.ID){

                KeyBoard.updateKeyBoardKeys(() => {
                    object.activate(activate.ID)
                })
    
            }

            object.addActivate(activate)
            
        }else{
            console.error("The loader have:",this.returnLoader(typeOfLoader).getAll())
            throw new Error(
                "The loader: [" + typeOfLoader + "] don't have: [" + activateName + "]"
            )
        }

    }
    
    returnRandomActivate(typeOfLoader = "random"){

        let loader = this.defineLoader(typeOfLoader)

        let allActivates = loader.getAll()

        let activateName = returnRandomObject(allActivates)

        return loader.getInfo(activateName)

    }

    returnActivate(typeOfLoader, activateName){

        var loader = this.defineLoader(typeOfLoader)

        return loader.getInfo(activateName)

    }

    returnLoader(typeOfLoader){

        return this.loaders[typeOfLoader]

    }


    defineLoader(typeOfLoader){

        if(typeOfLoader == "random"){
            var loader = this.returnRandomLoader()
        }else{
            var loader = this.returnLoader(typeOfLoader)
        }

        return loader

    }
    
    returnRandomLoader(){

        return this.loaders[returnRandomObject(
            this.loaders
        )]

    }

}