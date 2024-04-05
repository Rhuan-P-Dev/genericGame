
import { CloneObjectController } from "../../generalUtils/cloneObject.js"

var CloneObject

onInit(function(){

    CloneObject = new CloneObjectController()

})

function replaceString(string, replacement, index) {
    return string.substring(0, index) + replacement + string.substring(index + replacement.length)
}

export class InterpolateController {

    run(animationData){

        return this.interpolateInstructions(animationData)

    }

    interpolateInstructions(data){

        for(let instruction in data.frames){

            if(data.frames[instruction].length === 1){

                data.frames[instruction].push(data.frames[instruction][0])

            }

            let newInstructions = []

            let frameMult = (data.frameRate / (data.frames[instruction].length-1)) * data.seconds - 1

            let cachedPositions = []
    
            for (let index = 0; index < data.frames[instruction].length-1; index++) {
    
                let currentFrame = data.frames[instruction][index]
                let nextFrame = data.frames[instruction][index+1]

                this.updateTypes[instruction](
                    currentFrame,
                    cachedPositions,
                )

                newInstructions = newInstructions.concat(this.createTypes[instruction](
                    cachedPositions,
                    currentFrame,
                    nextFrame,
                    frameMult
                ))

            }

            data.frames[instruction] = newInstructions

        }

        return data

    }

    updateTypes = {
        //"scale": () => {},
        //"canvasScale": () => {},
        //"objectColor": () => {},
        //"offset": () => {},
        //"reference": () => {},
        //"rotation": () => {},
        //"xMirror": () => {},
        //"yMirror": () => {},
        //"xyMirror": () => {},

        "continuous": this.updateContinuousPositions,

        "xy": this.updateXYPositions,

        "radius": this.updateIntPosition,

        "text": this.updateIntPosition,
        "fontSize": this.updateIntPosition,

        "startAngle": this.updateIntPosition,
        "endAngle": this.updateIntPosition,

        "fill": this.updateIntPosition,
        "lineWidth": this.updateIntPosition,
        "color": this.updateContinuousPositions,
        
    }

    createTypes = {
        //"scale": () => {},
        //"canvasScale": () => {},
        //"objectColor": () => {},
        //"offset": () => {},
        //"reference": () => {},
        //"rotation": () => {},
        //"xMirror": () => {},
        //"yMirror": () => {},
        //"xyMirror": () => {},
        

        "continuous": this.createContinuousFrames,

        "xy": this.createXYFrames,

        "radius": this.createIntFrames,

        "text": this.createTextFrames,
        "fontSize": this.createIntFrames,

        "startAngle": this.createIntFrames,
        "endAngle": this.createIntFrames,

        "fill": this.createBooleanFrames,
        "lineWidth": this.createIntFrames,
        "color": this.createContinuousFrames,
        
    }

    createContinuousFrames(
        cachedPositions,
        currentFrame,
        nextFrame,
        frameMult
    ){

        let newFrames = [currentFrame]

        let interpolationArray = []

        for(let index in nextFrame ){

            interpolationArray[index] = []

            for(let subIndex in nextFrame[index] ){

                interpolationArray[index][subIndex] = (
                    nextFrame[index][subIndex] - cachedPositions[index][subIndex]
                ) / frameMult

            }

        }

        for (
            let interpolationMult = 1;
            interpolationMult <= frameMult;
            interpolationMult++
        ) {

            let currentIndex = newFrames.length

            newFrames[currentIndex] = {}

            for(let index in nextFrame ){
                    
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

    createXYFrames(
        cachedPositions,
        currentFrame,
        nextFrame,
        frameMult
    ){

        let newFrames = [currentFrame]

        let interpolationArray = {}

        for(let index in nextFrame ){

            interpolationArray[index] = (
                nextFrame[index] - cachedPositions[index]
            ) / frameMult

        }

        for (
            let interpolationMult = 1;
            interpolationMult <= frameMult;
            interpolationMult++
        ) {

            let currentIndex = newFrames.length

            newFrames[currentIndex] = {}

            for(let index in nextFrame ){

                if(nextFrame[index] !== undefined){

                    newFrames[currentIndex][index] = cachedPositions[index] + (
                        interpolationArray[index] * interpolationMult
                    )

                }

            }

        }

        return newFrames

    }

    createIntFrames(
        cachedPositions,
        currentFrame,
        nextFrame,
        frameMult
    ){

        let newFrames = [currentFrame]

        let interpolation = (
            nextFrame - cachedPositions[0]
        ) / frameMult

        for (
            let interpolationMult = 1;
            interpolationMult <= frameMult;
            interpolationMult++
        ) {

            newFrames[newFrames.length] = cachedPositions[0] + (
                interpolation * interpolationMult
            )

        }

        return newFrames

    }

    createBooleanFrames(
        cachedPositions,
        currentFrame,
        nextFrame,
        frameMult
    ){

        let newFrames = [currentFrame]

        let halfFrameMult = frameMult / 2

        for (
            let interpolationMult = 1;
            interpolationMult <= frameMult;
            interpolationMult++
        ) {

            if(halfFrameMult <= interpolationMult){
                newFrames[newFrames.length] = nextFrame
            }else{
                newFrames[newFrames.length] = currentFrame
            }

        }

        return newFrames

    }

    createTextFrames(
        cachedPositions,
        currentFrame,
        nextFrame,
        frameMult
    ){

        let tempFrameString = cachedPositions[0]

        let nextFrameCachedPositionsDiff = nextFrame.length - cachedPositions[0].length

        // if the nextFrame is longer than the currentFrame(tempFrameString) then we need to spand the text
        for (let index = 0; index < nextFrameCachedPositionsDiff / 2; index++) {

            tempFrameString = " " + tempFrameString + " "

        }

        let cutTextRate = cachedPositions[0].length / nextFrame.length
        let cutRateCount = 0
        let paddingOffSet = 0

        // add a padding to the nextFrame if the curretFrame is longer than the nextFrame
        if(0 < cutTextRate){

            paddingOffSet = tempFrameString.length / 4

        }

        let newFrames = [currentFrame]

        let passTextRate = (frameMult / nextFrame.length-1) / 2
        let passRateCount = 0
        let endCountDown = nextFrame.length

        let usedStringPositions = {}

        let lastInterpolationMult = undefined

        for (
            let interpolationMult = 0;
            interpolationMult <= frameMult
            &&
            endCountDown >= 0;
            interpolationMult++,
            passRateCount++
        ){

            let tryRerolling = 1000

            lastInterpolationMult = interpolationMult

            while(passRateCount >= passTextRate){
                passRateCount -= passTextRate
                cutRateCount = cutTextRate

                // cut the curretFrame's text if the curretFrame is longer than the nextFrame
                while(
                    cutRateCount > 0
                    &&
                    nextFrameCachedPositionsDiff < 0
                ){
                    cutRateCount-=2
    
                    nextFrameCachedPositionsDiff+=2
                    tempFrameString = tempFrameString.substring(0, tempFrameString.length - 1)
                    tempFrameString = tempFrameString.substring(1, tempFrameString.length)

                    paddingOffSet = tempFrameString.length / 4
    
                }

                // stop the padding if the nextFrame and curretFrame are the same length
                if(nextFrameCachedPositionsDiff >= 0 ){
                    paddingOffSet = 0
                }

                let randomPosition = randomInteger(0, nextFrame.length-1)

                while(
                    usedStringPositions[randomPosition]
                    &&
                    tryRerolling > 0
                ){
                    
                    randomPosition = randomInteger(0, nextFrame.length-1)

                    tryRerolling--

                }

                endCountDown--

                if(tryRerolling <= 0){
                    break
                }

                usedStringPositions[randomPosition] = true

                tempFrameString = replaceString(tempFrameString, nextFrame[randomPosition], randomPosition+paddingOffSet)

            }

            newFrames[newFrames.length] = tempFrameString

        }

        for (
            let remainingFrameMult = frameMult - lastInterpolationMult;
            remainingFrameMult > 0;
            remainingFrameMult--
        ) {

            newFrames[newFrames.length] = tempFrameString

        }

        return newFrames

    }

    updateContinuousPositions(frame, array){

        for(let index in frame ){

            if(array[index] === undefined){
                array[index] = []
            }

            for(let subIndex in frame[index] ){

                array[index][subIndex] = frame[index][subIndex]

            }

        }
    
    }

    updateXYPositions(frame, object){

        for(let index in frame ){

            object[index] = frame[index]

        }

    }

    updateIntPosition(frame, object){

        object[0] = frame

    }

    runTimeProcess(shapeData, instruction, tempAnimationData, params){

        let currentFrame = shapeData.frames[instruction][params.currentFrameLenght]

        Interpolate.updateTypes[instruction](currentFrame, params.animationObject)

        let animationObjectClone = CloneObject.recursiveCloneAttribute(params.animationObject)

        tempAnimationData[instruction] = animationObjectClone

    }

}

var Interpolate = new InterpolateController()