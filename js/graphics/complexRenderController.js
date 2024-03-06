import { GameStateController } from "../gameState/gameStateController.js"
import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { ComplexShapesDatabaseController } from "./complexShapes/complexShapesDatabaseController.js"
import { ScreenRenderController } from "./screenRenderController.js"

var Clone = ""
var ScreenRender = ""
var ComplexShapesDatabase
var GameState

onInit(function(){

    Clone = new CloneObjectController()
    ScreenRender = new ScreenRenderController()
    ComplexShapesDatabase = new ComplexShapesDatabaseController()
    GameState = new GameStateController()

})

export class ComplexRenderController {

    getObjectScale(object){

        return ( (object.width + object.height) / 2) / 6

    }

    scalonateParam = {
        "drawLine": (
            object,
            functionName,
            originalParams,
            params,
        ) => {

            let scale = this.getObjectScale(object)

            for(let index in params.positions){

                let pos = params.positions[index]

                pos[0] *= scale
                pos[1] *= scale

            }

            params.lineWidth *= scale

        },

        "drawCircle": (
            object,
            functionName,
            originalParams,
            params,
        ) => {

            let scale = this.getObjectScale(object)

            params.x *= scale
            params.y *= scale

            params.radius *= scale
            params.lineWidth *= scale

        },

        "drawArc": (
            object,
            functionName,
            originalParams,
            params,
        ) => {

            this.scalonateParam["drawCircle"](object, functionName, originalParams, params)

        },

        "writeText": (
            object,
            functionName,
            originalParams,
            params,
        ) => {

            let scale = this.getObjectScale(object)

            params.x *= scale
            params.y *= scale
            params.fontSize *= scale

        },

    }

    runtimeConfigObjectRender(
        object,
        functionName,
        originalParams,
        params,
    ){

        if(params.scale){

            this.scalonateParam[functionName](
                object,
                functionName,
                originalParams,
                params,
            )

        }

    }

    configObjectRender(
        object,
        drawInstructions
    ){

        for (let index = 0; index < drawInstructions.length; index++) {

            let drawInstruction = drawInstructions[index]

            let originalParams = drawInstruction.params

            if(originalParams.objectColor){

                originalParams.color = object.color

            }

        }

    }

    mirrorFunction(functionName, params, scaleX, scaleY){

        ScreenRender.setCanvasState(
            {
                "x": this.offscreen.getOffsetX(),
                "y": this.offscreen.getOffsetY(),
            },
            0,
            scaleX,
            scaleY,
            ScreenRender.offscreenCanvasContext
        )

        ScreenRender[functionName](params, ScreenRender.offscreenCanvasContext)

        ScreenRender.resetCanvas(ScreenRender.offscreenCanvasContext)

    }

    mirror(functionName, params){

        ScreenRender.resetCanvas(ScreenRender.offscreenCanvasContext)

        if(params.xMirror){
            this.mirrorFunction(
                functionName,
                params,
                params.canvasScale * -1,
                params.canvasScale,
            )
        }

        if(params.yMirror){
            this.mirrorFunction(
                functionName,
                params,
                params.canvasScale,
                params.canvasScale * -1,
            )
        }

        if(params.xyMirror){
            this.mirrorFunction(
                functionName,
                params,
                params.canvasScale * -1,
                params.canvasScale * -1,
            )
        }

    }

    useComplexFormat(object){

        ScreenRender.resetCanvas()

        let objectOffset = this.offscreen.getObjectXY(object)

        let focus = ScreenRender.shiftFocus(
            {
                "x": GameState.getPlayer().x - (ScreenRender.mainCanvasContext.canvas.width / 2),
                "y": GameState.getPlayer().y - (ScreenRender.mainCanvasContext.canvas.height / 2),
            },
            object,
        )

        ScreenRender.setCanvasState(
            focus,
            object.radian,
        )

        ScreenRender.mainCanvasContext.drawImage(
            ScreenRender.offscreenCanvas,
            objectOffset.x - this.offscreen.width / 2,
            objectOffset.y - this.offscreen.height / 2,
            this.offscreen.width,
            this.offscreen.height,
            0 - this.offscreen.width / 2,
            0 - this.offscreen.height / 2,
            this.offscreen.width,
            this.offscreen.height
        )

    }

    renderComplexFormat(object){

        if(!this.offscreen[object.team]){
            this.offscreen[object.team] = {}
        }

        if(!this.offscreen[object.team][object.color]){
            this.offscreen[object.team][object.color] = {}
        }

        if(!this.offscreen[object.team][object.color][object.graphicID]){
            this.offscreen[object.team][object.color][object.graphicID] = {}
        }

        if(
            this.offscreen[object.team][object.color][object.graphicID][this.getObjectScale(object)] === undefined
        ){

            this.offscreen[object.team][object.color][object.graphicID][this.getObjectScale(object)] = this.offscreen.lenght



            let drawInstructions = undefined

            drawInstructions = ComplexShapesDatabase.get(object.graphicID, false)
    
            this.configObjectRender(object, drawInstructions)
    
            for (let index = 0; index < drawInstructions.length; index++) {
    
                let drawInstruction = drawInstructions[index]
    
                let functionName = drawInstruction.functionName
                let originalParams = drawInstruction.params
                let params = Clone.recursiveCloneAttribute(originalParams)

                this.runtimeConfigObjectRender(
                    object,
                    functionName,
                    originalParams,
                    params
                )

                params.lineWidth /= 4
    
                params.canvasScale += 1
    
                ScreenRender.resetCanvas(ScreenRender.offscreenCanvasContext)

                ScreenRender.setCanvasState(
                    {
                        "x": this.offscreen.getOffsetX(),
                        "y": this.offscreen.getOffsetY(),
                    },
                    0,
                    params.canvasScale,
                    params.canvasScale,
                    ScreenRender.offscreenCanvasContext
                )

                ScreenRender[functionName](params, ScreenRender.offscreenCanvasContext)
    
                this.mirror(functionName, params)
    
            }
            
            //this.drawSeparetorLine(object) // debug

            this.offscreen.lenght += 1

        }else{

            this.useComplexFormat(object)

        }

    }

    offscreen = new offscreen()

    drawSeparetorLine(object){

        ScreenRender.drawLine(
            {
                "positions": [
                    [
                        this.offscreen.getOffsetX() - this.offscreen.width / 2,
                        this.offscreen.getOffsetY() - this.offscreen.height / 2
                    ],[
                        this.offscreen.getOffsetX() + this.offscreen.width / 2,
                        this.offscreen.getOffsetY() - this.offscreen.height / 2
                    ],[
                        this.offscreen.getOffsetX() + this.offscreen.width / 2,
                        this.offscreen.getOffsetY() + this.offscreen.height / 2
                    ],[
                        this.offscreen.getOffsetX() - this.offscreen.width / 2,
                        this.offscreen.getOffsetY() + this.offscreen.height / 2
                    ],[
                        this.offscreen.getOffsetX() - this.offscreen.width / 2,
                        this.offscreen.getOffsetY() - this.offscreen.height / 2
                    ]

                ],
                "color": "black",
                "lineWidth": 1,
                "fill": false,
            },
            ScreenRender.offscreenCanvasContext
        )

        ScreenRender.drawCircle(
            {
                "x": this.offscreen.getOffsetX(),
                "y": this.offscreen.getOffsetY(),
                "radius": object.width,
                "color": "white"
            },
            ScreenRender.offscreenCanvasContext
        )
    }

}

class offscreen {

    width = 50
    height = 50

    offsetX = 50
    offsetY = 30
    lenght = 0

    getObjectXY(object) {

        let lenght = this[object.team][object.color][object.graphicID][ComplexRender.getObjectScale(object)]

        return {
            x: this.getOffsetX(lenght),
            y: this.getOffsetY()
        }

    }

    getOffsetX(lenght = this.lenght) {
        return (this.offsetX * lenght) + 30
    }

    getOffsetY() {
        return this.offsetY
    }

}

var ComplexRender = new ComplexRenderController()