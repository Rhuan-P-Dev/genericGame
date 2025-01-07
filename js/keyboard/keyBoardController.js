import { GameStateController } from "../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

})

var keyBoardFunctions = {}

var keyBoardFunctionsBoolean = {}

var player = ""

var arbitraryKeysSequence = {
   "a":"s",
   "s":"d",
   "d":"f",
   "f":"q",
   "q":"w",
   "w":"e",
   "e":"r",
   "r":"z",
   "z":"x",
   "x":"c",
   "c":"v",
}

export class KeyBoardController {

    HTML = document.querySelector("html")

    makeObjectInPlayerControl(object){

        player = object

        keyBoardFunctions = {
            "ArrowUp": () => {player.advanceShip()},
            "ArrowLeft": () => {player.rotateToLeft()},
            "ArrowRight": () => {player.rotateToRight()},
        }

        keyBoardFunctionsBoolean = {
            "ArrowUp": false,
            "ArrowLeft": false,
            "ArrowRight": false,
        }

        GameState.setPlayer(object)

        return object

    }

    updateKeyBoardKeys(func, key = "a", overwrite = false){

        if(overwrite){
            keyBoardFunctions[key] = func
            keyBoardFunctionsBoolean[key] = false
            return
        }

        while(keyBoardFunctions[key]){
            key = arbitraryKeysSequence[key]
        }

        if(key == undefined){return}

        keyBoardFunctions[key] = func
        keyBoardFunctionsBoolean[key] = false
    }
    resetKeyboardBinding(){
        keyBoardFunctions = {}
        keyBoardFunctionsBoolean = {}
    }

    runCommands(){

        for(let key in keyBoardFunctionsBoolean){
            let value = keyBoardFunctionsBoolean[key]

            if(value){

                if(player){

                    keyBoardFunctions[key]()

                }

            }

        }

    }

    addTriggers(){

        this.HTML.addEventListener("keydown", (event) => {

            if(keyBoardFunctionsBoolean[event["key"]] != undefined){

                keyBoardFunctionsBoolean[event["key"]] = true

            }


        })

        this.HTML.addEventListener("keyup", (event) => {

            if(keyBoardFunctionsBoolean[event["key"]] != undefined){

                keyBoardFunctionsBoolean[event["key"]] = false

            }

        })

    }

    tryAddToPlayer(object){

        if(GameState.getPlayer().ID != object.ID){return}

        this.makeObjectInPlayerControl(object)

        for (const ID in object.activates) {

            if(object.activates[ID].auto){continue}
            
            KeyBoard.updateKeyBoardKeys(() => {
                object.activate(ID)
            })

        }

    }

}

var KeyBoard = new KeyBoardController()