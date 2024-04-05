import { setFrameOut } from "../../frame/frameController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { ScreenRenderController } from "../screenRenderController.js"
import { AnimationsDataBase } from "./animationsDataBase.js"
import { InterpolateController } from "./interpolateController.js"

var GameState = ""
var ScreenRender = ""
var DataBase = ""
var Interpolate


onInit(function(){

    GameState = new GameStateController()

    ScreenRender = new ScreenRenderController()

    //DataBase = new AnimationsDataBase()

    Interpolate = new InterpolateController()

})

export class AnimationsController {

    run(animationConfig){

        let animationData = new AnimationsDataBase().get(animationConfig.name)

        for(let shape in animationData){

            animationData[shape] = Interpolate.run(animationData[shape])

            let animationObject = {}

            for(let instruction in animationData[shape].frames){

                animationObject[instruction] = []

            }

            let tempAnimationData = {
                "xy": {},
                "text": {},
                "lineWidth": {},
                "fill": {},
                "color": [[]],
            }

            this.lazyAnimationEngine(animationConfig, animationData[shape], animationObject, tempAnimationData)

        }

    }

    lazyAnimationEngine(animationConfig, shapeData, animationObject, tempAnimationData, currentLoop = 0, currentFrameLenght = 0){

        if(shapeData.loop <= currentLoop){
            return
        }

        for(let instruction in shapeData.frames){

            Interpolate.runTimeProcess(shapeData, instruction, tempAnimationData, {
                currentFrameLenght,
                "animationObject": animationObject[instruction],
            })

        }
    
        this.drawAnimationFrame(animationConfig, shapeData, tempAnimationData)

        currentFrameLenght++
        
        if(shapeData.frameRate * shapeData.seconds <= currentFrameLenght){
    
            currentLoop++
            currentFrameLenght = 0
    
        }
    
        setFrameOut(() => {
            this.lazyAnimationEngine(animationConfig, shapeData, animationObject, tempAnimationData, currentLoop, currentFrameLenght)
        },2)
    
    }

    drawAnimationFrame(animationConfig, shapeData, tempAnimationData){

        let randomX = randomInteger(
            -animationConfig.frameRandomOffsetX,
            animationConfig.frameRandomOffsetX
        )
    
        let randomY = randomInteger(
            -animationConfig.frameRandomOffsetY,
            animationConfig.frameRandomOffsetY
        )

        if(tempAnimationData.continuous){

            for (let index = 0; index < tempAnimationData.continuous.length; index++) {
    
                tempAnimationData.continuous[index][0] += animationConfig.focus.x + animationConfig.offset.x + randomX
                tempAnimationData.continuous[index][1] += animationConfig.focus.y + animationConfig.offset.y + randomY
        
            }

        }else{

            tempAnimationData.xy.x += animationConfig.focus.x + animationConfig.offset.x + randomX
            tempAnimationData.xy.y += animationConfig.focus.y + animationConfig.offset.y + randomY

        }

        ScreenRender.addDrawRequest(
            {
                "func": ScreenRender[shapeData.func],
                "params": {
                    "positions": tempAnimationData.continuous,
                    "x": tempAnimationData.xy.x,
                    "y": tempAnimationData.xy.y,
                    "radius": tempAnimationData.radius,
                    "startAngle": tempAnimationData.startAngle,
                    "endAngle": tempAnimationData.endAngle,
                    "text": tempAnimationData.text[0],
                    "color": "rgb("+tempAnimationData.color[0][0]+","+tempAnimationData.color[0][1]+","+tempAnimationData.color[0][2]+")",
                    "lineWidth": tempAnimationData.lineWidth[0],
                    "fill": tempAnimationData.fill[0]
                }
            }
    
        )
    
    }

}

var Animations = new AnimationsController()