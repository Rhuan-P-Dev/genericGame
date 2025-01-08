
import { CustomMathController } from "../generalUtils/math.js"

var CustomMath

onInit(function(){

    CustomMath = new CustomMathController()

})

var previousTime = performance.now()

var currentFPS = 60

const framesWindow = 1/10

export class FPSController {

    FPSCap = 35

    calculateFPS() {

        let currentTime = performance.now()
        let elapsedTime = (currentTime - previousTime) / 1000
        previousTime = currentTime
        let fps = parseInt(1 / elapsedTime)

        fps *= Math.min(
            CustomMath.linear(fps, this.FPSCap) ** 4,
            1
        )
    
        currentFPS += (fps - currentFPS) * framesWindow

    }

    update(){

        this.calculateFPS()

    }

    getFPS(){
        return currentFPS
    }

}