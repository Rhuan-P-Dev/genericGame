
import { setFrameOut } from "../../frame/frameController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { CloneObjectController } from "../../generalUtils/cloneObject.js"
import { ScreenRenderController } from "../screenRenderController.js"
import { AnimationsDataBase } from "./animationsDataBase.js"

var GameState = ""
var ScreenRender = ""
var DataBase = ""

onInit(function(){

    GameState = new GameStateController()

    ScreenRender = new ScreenRenderController()

    DataBase = new AnimationsDataBase()

})

export class AnimationsController {

    run(animationName){

        let animationData = DataBase.get(animationName)

        let animaArray = []

        let out = 1

        for(let frame in animationData.bola.frames){

            let currentFrame = animationData.bola.frames[frame]

            for(let index in currentFrame ){

                if(!animaArray[index]){
                    animaArray[index] = []
                }

                if(typeof(currentFrame[index][0]) == "number"){
                    animaArray[index][0] = currentFrame[index][0]
                }

                if(typeof(currentFrame[index][1]) == "number"){
                    animaArray[index][1] = currentFrame[index][1]
                }

            }

            let currentPoxs = cloneArray(animaArray)

            setFrameOut( () => {

                ScreenRender.addDrawRequest(
                {
                    "func": ScreenRender[animationData.bola.func],
                    "params": {
                        "positions": currentPoxs,
                        "color": "black",
                        "lineWidth": 2,
                    }
                }
    
            )
    
            },
            out,
            1)

            out+=10

        }

    }

}

var Animations = new AnimationsController()


function cloneArray(arr){

    let newArr = new Array()

    for (let x = 0; x < arr.length; x++) {

        for (let y = 0; y < arr[x].length; y++) {

            if(!newArr[x]){
                newArr[x] = []
            }

            newArr[x][y] = arr[x][y]
            
        }
        
    }

    return newArr

}
