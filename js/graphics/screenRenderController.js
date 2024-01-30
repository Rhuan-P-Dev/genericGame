
import { GameStateController } from "../gameState/gameStateController.js"
import { VectorController } from "../generalUtils/vector.js"
import { ComplexRenderController } from "./complexRenderController.js"

var GameState = ""
var Vector = ""
var complexRender = ""

onInit(function(){

    GameState = new GameStateController()
    Vector = new VectorController()
    complexRender = new ComplexRenderController()

})

class DrawRequestLinkedList extends LinkedList{

    runAll(){

        let node = this.list.next

        while(1){
            if(!node.next){return}

            node.value.func(node.value.params)

            node = node.next

        }

    }

}

var DrawRequestQueue = new DrawRequestLinkedList()

export class ScreenRenderController {

    mainCanvas = document.getElementById("mainCanvas")
    mainCanvasContext = mainCanvas.getContext("2d")

    defaultColor = "black"
    defaultLineWidth = 1

    addDrawRequest(params){

        DrawRequestQueue.add(params)

    }

    runRequests(){
        DrawRequestQueue.runAll()
        DrawRequestQueue = new DrawRequestLinkedList()
    }

    update(){

        ScreenRender.clean()

        ScreenRender.runRequests()

        let allObjectsRenderable = GameState.getAllObjectsRender()

        for(let objectName in allObjectsRenderable){

            let object = allObjectsRenderable[objectName]

            ScreenRender.defaultParams()

            ScreenRender.rotateObject(object)

            ScreenRender.renderTheFrontOfShip(object)
            
            ScreenRender.renderComplexFormat(object)

            ScreenRender.resetCanvas()

        }

    }

    rotateObject(object){

        ScreenRender.mainCanvasContext.translate(object.x, object.y)

        ScreenRender.mainCanvasContext.rotate(
            object.radian
        )

    }

    resetCanvas(){

        ScreenRender.mainCanvasContext.resetTransform()

    }

    renderTheFrontOfShip(object){

        //ugly
        if(!object.radian){return}

        ScreenRender.mainCanvasContext.beginPath()
        ScreenRender.mainCanvasContext.moveTo(0, 0)
        ScreenRender.mainCanvasContext.lineTo(
            0, (object.width + object.height) * 2
        )
        ScreenRender.mainCanvasContext.closePath()
        ScreenRender.mainCanvasContext.stroke()

        return

        ScreenRender.mainCanvasContext.beginPath()
        ScreenRender.mainCanvasContext.moveTo(0, 0)
        ScreenRender.mainCanvasContext.lineTo(
            0 + ( ( object.width/2 ) * object.cosine ) * 10
            ,
            0 + ( ( object.height/2 ) * object.sine ) * 10
        )
        ScreenRender.mainCanvasContext.closePath()
        ScreenRender.mainCanvasContext.stroke()


    }

    renderComplexFormat(object){

        complexRender.renderComplexFormat(object)

        ScreenRender.mainCanvasContext.fillStyle = object.color

        ScreenRender.mainCanvasContext.beginPath()
        ScreenRender.mainCanvasContext.moveTo(0 - object.width, 0 - object.height)
        ScreenRender.mainCanvasContext.lineTo(0 + object.width, 0 - object.height)
        ScreenRender.mainCanvasContext.lineTo(0 + object.width, 0 + object.height)
        ScreenRender.mainCanvasContext.lineTo(0 - object.width, 0 + object.height)
        ScreenRender.mainCanvasContext.fill()

    }

    drawCircle(params) {

        ScreenRender.setStyleParams(params)

        ScreenRender.mainCanvasContext.beginPath()
        ScreenRender.mainCanvasContext.arc(
            params.x,
            params.y,
            params.radius,
            0,
            Math.PI * 2
        )
        
        if(params.fill){
            ScreenRender.mainCanvasContext.fill()
        }else{
            ScreenRender.mainCanvasContext.stroke()
        }
        

    }

    drawLine(params){

        ScreenRender.setStyleParams(params)

        ScreenRender.mainCanvasContext.beginPath()

        ScreenRender.mainCanvasContext.moveTo(
            params.positions[0][0],
            params.positions[0][1]
        )

        for (let index = 1; index < params.positions.length; index++) {
    
            ScreenRender.mainCanvasContext.lineTo(
                params.positions[index][0],
                params.positions[index][1]
            )

        }

        if(params.fill){
            ScreenRender.mainCanvasContext.fill()
        }else{
            ScreenRender.mainCanvasContext.stroke()
        }
        ScreenRender.mainCanvasContext.closePath()

    }

    writeText(params){

        ScreenRender.setStyleParams(params)

        ScreenRender.mainCanvasContext.font = (params.fontSize || 50) + "px Arial"

        ScreenRender.mainCanvasContext.textAlign = params.align || "center"

        ScreenRender.mainCanvasContext.fillText(
            params.text,
            params.x,
            params.y
        )

    }

    drawArc(params) {

        ScreenRender.setStyleParams(params)

        ScreenRender.mainCanvasContext.beginPath()
        ScreenRender.mainCanvasContext.arc(
            params.x,
            params.y,
            params.radius,
            params.startAngle,
            params.endAngle
        )
        if(params.fill){
            ScreenRender.mainCanvasContext.fill()
        }else{
            ScreenRender.mainCanvasContext.stroke()
        }
    }

    setStyleParams(params){

        ScreenRender.mainCanvasContext.strokeStyle = params.color || ScreenRender.defaultColor
        ScreenRender.mainCanvasContext.lineWidth = params.lineWidth || ScreenRender.defaultLineWidth
        ScreenRender.mainCanvasContext.fillStyle = params.color || ScreenRender.defaultColor

    }

    defaultParams(){

        ScreenRender.mainCanvasContext.strokeStyle = ScreenRender.defaultColor
        ScreenRender.mainCanvasContext.fillStyle = ScreenRender.defaultColor
        ScreenRender.mainCanvasContext.lineWidth = ScreenRender.defaultLineWidth

    }

    clean(){
        ScreenRender.mainCanvasContext.clearRect(
            0,
            0,
            ScreenRender.mainCanvas.width,
            ScreenRender.mainCanvas.height
        )
    }

}

var ScreenRender = new ScreenRenderController()