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

            object.addActivate(activate)
            
        }else{
            console.error("The loader have:",ActivateInfo.getLoarders()[typeOfLoader])
            throw new Error(
                "The loader: [" + typeOfLoader + "] don't have: [" + activateName + "]"
            )
        }

    }

    removeActivate(object, activateName, removeAll = false) {

        for (let activateID in object.activates) {

            let activate = object.activates[activateID]

            if (activate.name === activateName) {

                if (
                    GameState.getPlayer().ID === object.ID
                    &&
                    !activate.auto
                ) {

                    KeyBoard.removeKeyboardBinding(activate.keyBinding)

                }

                if(activate.auto){
                    GameState.remove(
                        activate
                    )
                }

                delete object.activates[activateID]

                if(!removeAll){
                    return
                }

            }

        }

    }

    removeAllActivate(object, activateName) {

        this.removeActivate(object, activateName, true)

    }

    setActivates(object, activates){

        for (let key in activates) {

            for (let index = 0; index < activates[key].length; index++) {

                let activateName = activates[key][index]

                this.giveActivate(object, key, activateName)

            }

        }

    }
    
    returnRandomActivate(typeOfLoader = "random", addOnGame = true){

        let loaderName = this.defineTypeOfLoarderName(typeOfLoader)

        let allActivates = ActivateInfo.getAll()[loaderName]

        let activateName = returnRandomObject(allActivates)

        return ActivateInfo.build(loaderName, activateName, addOnGame)

    }

    returnActivate(typeOfLoader, activateName){

        return ActivateInfo.build(
            this.defineTypeOfLoarderName(typeOfLoader),
            activateName
        )

    }

    defineTypeOfLoarderName(typeOfLoader = "random"){

        if(typeOfLoader == "random"){
            typeOfLoader = returnRandomObject(ActivateInfo.getLoarders())
        }

        return typeOfLoader

    }

    addActivateInFormat(type, activates, format){

        if(!format[type]){
            format[type] = []
        }

        format[type] = format[type].concat(activates)

        return format

    }

}