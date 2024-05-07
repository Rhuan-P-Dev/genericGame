import { FrameController, setFrameOut } from "../../frame/frameController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { ScreenRenderController } from "../screenRenderController.js"
import { AnimationsDataBase } from "./animationsDataBase.js"
import { InterpolateController } from "./interpolateController.js"
import { CloneObjectController } from "../../generalUtils/cloneObject.js"

var GameState = ""
var ScreenRender = ""
var DataBase = ""
var Interpolate
var CloneObject
var Frame


onInit(function(){

    GameState = new GameStateController()

    ScreenRender = new ScreenRenderController()

    //DataBase = new AnimationsDataBase()

    Interpolate = new InterpolateController()

    CloneObject = new CloneObjectController()

    Frame = new FrameController()

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
                "fontSize": {},
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

        let frameRandomOffsetX = randomInterval(
            animationConfig.frameRandomOffsetX
        )
    
        let frameRandomOffsetY = randomInterval(
            animationConfig.frameRandomOffsetY
        )

        if(tempAnimationData.continuous){

            for (let index = 0; index < tempAnimationData.continuous.length; index++) {
    
                tempAnimationData.continuous[index][0] += (
                    animationConfig.focus.x
                    +
                    animationConfig.offset.x
                    +
                    frameRandomOffsetX
                    +
                    randomInterval(
                        animationConfig.randomPointOffsetX
                    )
                )

                tempAnimationData.continuous[index][1] += (
                    animationConfig.focus.y
                    +
                    animationConfig.offset.y
                    +
                    frameRandomOffsetY
                    +
                    randomInterval(
                        animationConfig.randomPointOffsetY
                    )
                )

            }

        }else{

            tempAnimationData.xy.x += animationConfig.focus.x + animationConfig.offset.x + frameRandomOffsetX
            tempAnimationData.xy.y += animationConfig.focus.y + animationConfig.offset.y + frameRandomOffsetY

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
                    "fill": tempAnimationData.fill[0],
                    "fontSize": tempAnimationData.fontSize[0],
                }
            }
    
        )
    
    }

    applyAnimations(object, animations, promise = false){

        for (let index = 0; index < animations.length; index++) {

            let randomID = randomUniqueID()

            if(!promise){

                let animationConfig = animations[index].animationConfig
                let loopConfig = animations[index].loopConfig
                let runTimeBuild = animations[index].runTimeBuild

                Frame.add(
                    () => {
                        
                        runTimeBuild(
                            object,
                            animationConfig,
                            loopConfig
                        )
                
                        Animations.run(
                            CloneObject.recursiveCloneAttribute(animationConfig)
                        )
    
                    },
                    loopConfig.frameOut,
                    -1,
                    true,
                    randomID,
                    () => {
                        Animations.remove(object, randomID)
                    }
                )

            }

            object.animations[randomID] = {
                "runTimeBuild": animations[index].runTimeBuild,
                "animationConfig": animations[index].animationConfig,
                "loopConfig": animations[index].loopConfig,
                promise,
            }

        }

    }

    closePromises(object){

        for (let index in object.animations){

            let animation = object.animations[index]

            if(animation.promise){

                animation.promise = false

                this.applyAnimations(
                    object,
                    [animation],
                    false
                )

            }

        }

    }

    remove(object, ID){

        Frame.remove(ID)

        delete object.animations[ID]

    }

    removeAll(object){

        for (let animation in object.animations){

            this.remove(object, animation)

        }

        object.animations = {}

    }

}

var Animations = new AnimationsController()