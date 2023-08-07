var keyBoardFunctions = {}

var keyBoardFunctionsBoolean = {}

var player = ""

var arbitraryKeysSequence = {
   "a":"s",
   "s":"d",
   "d":"q",
   "q":"w",
   "w":"e",
   "e":"z",
   "z":"x",
   "x":"c",
}

export class KeyBoardController {

    HTML = document.querySelector("html")

    player = undefined

    addObjectInPlayerControl(object){

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

}

var KeyBoard = new KeyBoardController()