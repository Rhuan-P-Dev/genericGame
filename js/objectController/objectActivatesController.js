import { GameStateController } from "../gameState/gameStateController.js"
import { KeyBoardController } from "../keyboard/keyBoardController.js"
import { ActivateInfoController } from "../shipUnits/forAllShipUnits/activateInfoController.js"
import { WeaponsModifiersController } from "../shipUnits/weapons/modifiers/weaponsModifiersController.js"

var GameState = ""
var KeyBoard = ""
var WeaponsModifiers = ""
var ActivateInfo = ""

onInit(function(){

    GameState = new GameStateController()
    KeyBoard = new KeyBoardController()
    WeaponsModifiers = new WeaponsModifiersController()
    ActivateInfo = new ActivateInfoController()

})

export class ObjectActivatesController{

    giveActivate(object, typeOfLoader = "random", activateName = "random"){

        let activate = undefined

        if(activateName == "random"){
            activate = this.returnRandomActivate(typeOfLoader)
        }else{
            activate = this.returnActivate(typeOfLoader, activateName)
        }

        if(activate){

            if(
                GameState.getPlayer().ID == object.ID
                &&
                !activate.auto
            ){

                KeyBoard.updateKeyBoardKeys(() => {
                    object.activate(activate.ID)
                })
    
            }

            object.addActivate(activate)
            
        }else{
            console.error("The loader have:",ActivateInfo.getLoarders()[typeOfLoader])
            throw new Error(
                "The loader: [" + typeOfLoader + "] don't have: [" + activateName + "]"
            )
        }

    }
    
    returnRandomActivate(typeOfLoader = "random"){

        let loaderName = this.defineTypeOfLoarderName(typeOfLoader)

        let allActivates = ActivateInfo.getAll()[loaderName]

        let activateName = returnRandomObject(allActivates)

        return ActivateInfo.build(loaderName, activateName)

    }

    returnActivate(typeOfLoader, activateName){

        return ActivateInfo.build(
            this.defineTypeOfLoarderName(typeOfLoader),
            activateName
        )

    }

    defineTypeOfLoarderName(typeOfLoader){

        if(typeOfLoader == "random"){
            typeOfLoader = returnRandomObject(ActivateInfo.getLoarders())
        }

        return typeOfLoader

    }

}