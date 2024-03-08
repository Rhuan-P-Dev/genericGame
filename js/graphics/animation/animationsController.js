
import { setFrameOut } from "../../frame/frameController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { CloneObjectController } from "../../generalUtils/cloneObject.js"
import { ScreenRenderController } from "../screenRenderController.js"
import { AnimationsDataBase } from "./animationsDataBase.js"

var GameState = ""
var ScreenRender = ""
var DataBase = ""
var CloneObject


onInit(function(){

    GameState = new GameStateController()

    ScreenRender = new ScreenRenderController()

    CloneObject = new CloneObjectController()

    //DataBase = new AnimationsDataBase()

})

export class AnimationsController {

    typeOfAnimation = {
        "absolute": absolute,
        "relative": relative,
    }

    run(animation){

        let animationData = new AnimationsDataBase().get(animation.name)

        for(let shape in animationData){

            animationData[shape] = this.interpolateFrames(animationData[shape])

            let animationArray = []

            let frameInterval = animationData[shape].frameInterval

            for (let index = 0; index < animationData[shape].loop; index++) {

                for(let frame in animationData[shape].frames){

                    let currentFrame = animationData[shape].frames[frame]

                    this.updatePositions(
                        currentFrame,
                        animationArray
                    )

                    let currentPositions = CloneObject.recursiveCloneAttribute(animationArray)

                    this.typeOfAnimation[animation.type]({
                        "func": animationData[shape].func,
                        "currentPositions": currentPositions,
                        "frameInterval": frameInterval,
                        "offset": animation.offset,
                        "frameRandomOffsetX": animation.frameRandomOffsetX,
                        "frameRandomOffsetY": animation.frameRandomOffsetY,
                    })
                    
                    frameInterval += animationData[shape].frameIntervalIncremental
        
                }
                
            }

        }

    }

    interpolateFrames(data){

        let newFrames = []

        let frameMult = (data.frameRate / (data.frames.length-1)) * data.seconds - 1

        let cachedPositions = []

        for (let index = 0; index < data.frames.length; index++) {

            if(!data.frames[index+1]){break}
            
            let currentFrame = data.frames[index]
            let nextFrame = data.frames[index+1]

            this.updatePositions(
                currentFrame,
                cachedPositions,
            )

            newFrames = newFrames.concat(newFrames, this.createFrames(
                cachedPositions,
                currentFrame,
                nextFrame,
                frameMult
            ))
            
        }

        console.log(

            newFrames.length

        )

        data.frames = newFrames

        return data

    }

    createFrames(
        cachedPositions,
        currentFrame,
        nextFrame,
        frameMult
    ){

        let newFrames = [currentFrame]

        for(let index in nextFrame ){

            let interpolationArray = []
            interpolationArray[index] = []

            for(let subIndex in nextFrame[index] ){

                interpolationArray[index][subIndex] = (
                    nextFrame[index][subIndex] - cachedPositions[index][subIndex]
                ) / frameMult

            }

            for (
                let interpolationMult = 1;
                interpolationMult <= frameMult;
                interpolationMult++
            ) {

                let currentIndex = newFrames.length

                newFrames[currentIndex] = {}
                newFrames[currentIndex][index] = {}

                for(let subIndex in nextFrame[index] ){

                    if(nextFrame[index][subIndex] !== undefined){

                        newFrames[currentIndex][index][subIndex] = cachedPositions[index][subIndex] + (
                            interpolationArray[index][subIndex] * interpolationMult
                        )

                    }

                }
                
            }

        }

        return newFrames
    
    }

    updatePositions(frame, array){

        for(let index in frame ){

            if(array[index] === undefined){
                array[index] = []
            }

            for(let subIndex in frame[index] ){

                array[index][subIndex] = frame[index][subIndex]

            }

        }
          
    }

}

var Animations = new AnimationsController()

function absolute(params){

    setFrameOut( () => {
        
        ScreenRender.addDrawRequest(
        {
            "func": ScreenRender[params.func],
            "params": {
                "positions": params.currentPositions,
                "color": "black",
                "lineWidth": 2,
            }
        }

    )

    },
    params.frameInterval,
    1)
    
}

function relative(params){

    let randomX = randomInteger(
        -params.frameRandomOffsetX,
        params.frameRandomOffsetX
    )

    let randomY = randomInteger(
        -params.frameRandomOffsetY,
        params.frameRandomOffsetY
    )

    for (let index = 0; index < params.currentPositions.length; index++) {

        params.currentPositions[index][0] += params.offset.x + randomX
        params.currentPositions[index][1] += params.offset.y + randomY
        
    }

    absolute(params)

}