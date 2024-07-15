
import { AIUtilsController } from "../AI/utils/AIUtils.js"
import { GameStateController } from "../gameState/gameStateController.js"
import { CustomMathController } from "../generalUtils/math.js"
import { ComplexRenderController } from "./complexRenderController.js"

var GameState = ""
var ComplexRender = ""
var CustomMath = ""
var AIUtils = ""

onInit(function(){

    GameState = new GameStateController()
    ComplexRender = new ComplexRenderController()
    CustomMath = new CustomMathController()
    AIUtils = new AIUtilsController()

})

class DrawRequestLinkedList extends LinkedList{

    runAll(){

        let node = this.list.next

        while(1){
            if(!node.next){return}

            if(this.checkInFocusVision(node.value.params)){

                node.value.func(node.value.params)

            }

            node = node.next

        }

    }

    checkInFocusVision(params){

        if(!params.positions){
            return this.checkInFocusVisionXY(params)
        }else{
            return this.checkInFocusVisionPositions(params.positions)
        }

    }

    checkInFocusVisionPositions(positions){

        for (let index = 0; index < positions.length; index++) {

            let position = positions[index]

            return ScreenRender.inFocusObjectVision(
                {
                    x: position[0],
                    y: position[1],
                }
            )
            
        }

    }

    checkInFocusVisionXY(params){

        return ScreenRender.inFocusObjectVision(params)

    }

}

var DrawRequestQueue = new DrawRequestLinkedList()

export class ScreenRenderController {

    mainCanvas = document.getElementById("mainCanvas")
    mainCanvasContext = mainCanvas.getContext("2d")

    offscreenCanvas = document.getElementById("offscreenCanvas")
    offscreenCanvasContext = offscreenCanvas.getContext("2d")

    defaultColor = "black"
    defaultLineWidth = 1

    focusObjectVisionRange = 750

    addDrawRequest(params){

        DrawRequestQueue.add(params)

    }

    runRequests(){
        DrawRequestQueue.runAll()
        DrawRequestQueue = new DrawRequestLinkedList()
    }

    update(){

        ScreenRender.clean()

        ScreenRender.reset({
            "x": 0,
            "y": 0,
            "radian": 0
        })

        ScreenRender.runRequests()

        let allObjectsRenderable = GameState.getAllObjectsRender()

        for(let objectName in allObjectsRenderable){

            let object = allObjectsRenderable[objectName]

            if(!this.inFocusObjectVision(object)){continue}

            ScreenRender.defaultParams()

            ComplexRender.renderComplexFormat(object)

            ScreenRender.resetCanvas()

        }

    }

    inFocusObjectVision(object){

        let player = GameState.getPlayer()

        let distance = AIUtils.getDistanceOfObjects(
            player,
            object
        )

        if(distance < this.focusObjectVisionRange){
            return true
        }

        return false

    }

    reset(
        object,
        scaleX = 1,
        scaleY = scaleX,
        canvasContext = ScreenRender.mainCanvasContext
    ){

        ScreenRender.resetCanvas()

        this.setCanvasState(
            this.shiftFocus(
                {
                    "x": GameState.getPlayer().x - (canvasContext.canvas.width / 2),
                    "y": GameState.getPlayer().y - (canvasContext.canvas.height / 2),
                },
                object,
            ),
            object.radian,
            scaleX,
            scaleY,
            canvasContext
        )

    }

    setCanvasState(translate, rotate, scaleX, scaleY = scaleX, canvasContext = ScreenRender.mainCanvasContext){

        canvasContext.translate(
            translate.x,
            translate.y
        )

        canvasContext.rotate(
            rotate
        )

        canvasContext.scale(
            scaleX,
            scaleY
        )

    }

    resetCanvas(canvasContext = ScreenRender.mainCanvasContext){

        canvasContext.resetTransform()

    }

    drawCircle(params, canvasContext = ScreenRender.mainCanvasContext) {

        if(params.radius < 0){
            console.warn("Radius:", params.radius)
            return
        }

        ScreenRender.setStyleParams(params, canvasContext)

        canvasContext.beginPath()
        canvasContext.arc(
            params.x,
            params.y,
            params.radius,
            0,
            Math.PI * 2
        )
        
        if(params.fill){
            canvasContext.fill()
        }else{
            canvasContext.stroke()
        }

    }

    drawLine(params, canvasContext = ScreenRender.mainCanvasContext){

        ScreenRender.setStyleParams(params, canvasContext)

        canvasContext.beginPath()

        canvasContext.moveTo(
            params.positions[0][0],
            params.positions[0][1]
        )

        for (let index = 1; index < params.positions.length; index++) {
    
            canvasContext.lineTo(
                params.positions[index][0],
                params.positions[index][1]
            )

        }

        if(params.fill){
            canvasContext.fill()
        }else{
            canvasContext.stroke()
        }
        canvasContext.closePath()

    }

    writeText(params, canvasContext = ScreenRender.mainCanvasContext){

        ScreenRender.setStyleParams(params, canvasContext)

        canvasContext.font = (params.fontSize || 50) + "px Arial"

        canvasContext.textAlign = params.align || "center"

        canvasContext.fillText(
            params.text,
            params.x,
            params.y
        )

    }

    drawArc(params, canvasContext = ScreenRender.mainCanvasContext) {

        if(params.radius < 0){
            console.warn("Radius:", params.radius)
            return
        }

        ScreenRender.setStyleParams(params, canvasContext)

        canvasContext.beginPath()
        canvasContext.arc(
            params.x,
            params.y,
            params.radius,
            params.startAngle,
            params.endAngle
        )
        if(params.fill){
            canvasContext.fill()
        }else{
            canvasContext.stroke()
        }
    }

    setStyleParams(params, canvasContext = ScreenRender.mainCanvasContext){

        canvasContext.strokeStyle = params.color || ScreenRender.defaultColor
        canvasContext.lineWidth = params.lineWidth || ScreenRender.defaultLineWidth
        canvasContext.fillStyle = params.color || ScreenRender.defaultColor

    }

    defaultParams(canvasContext = ScreenRender.mainCanvasContext){

        canvasContext.strokeStyle = ScreenRender.defaultColor
        canvasContext.fillStyle = ScreenRender.defaultColor
        canvasContext.lineWidth = ScreenRender.defaultLineWidth

    }

    clean(canvasContext = ScreenRender.mainCanvasContext){
        canvasContext.clearRect(
            0,
            0,
            canvasContext.canvas.width,
            canvasContext.canvas.height
        )
    }

    shiftFocus(focus, object){

        return {
            "x": CustomMath.inverter(focus.x) + object.x,
            "y": CustomMath.inverter(focus.y) + object.y
        }
    
    }

}

var ScreenRender = new ScreenRenderController()