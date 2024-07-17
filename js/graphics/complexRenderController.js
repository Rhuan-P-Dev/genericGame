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

        // 6 = width base & height base
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

    mirrorFunction(object, functionName, params, scaleX, scaleY){

        ScreenRender.setCanvasState(
            {
                "x": Offscreen.getOffsetX() + (params.offset.x *  this.getObjectScale(object)),
                "y": Offscreen.getOffsetY() + (params.offset.y *  this.getObjectScale(object))
            },
            0,
            scaleX,
            scaleY,
            ScreenRender.offscreenCanvasContext
        )

        ScreenRender[functionName](params, ScreenRender.offscreenCanvasContext)

        ScreenRender.resetCanvas(ScreenRender.offscreenCanvasContext)

    }

    mirror(object, functionName, params){

        ScreenRender.resetCanvas(ScreenRender.offscreenCanvasContext)

        if(params.xMirror){
            this.mirrorFunction(
                object,
                functionName,
                params,
                params.canvasScale * -1,
                params.canvasScale,
            )
        }

        if(params.yMirror){
            this.mirrorFunction(
                object,
                functionName,
                params,
                params.canvasScale,
                params.canvasScale * -1,
            )
        }

        if(params.xyMirror){
            this.mirrorFunction(
                object,
                functionName,
                params,
                params.canvasScale * -1,
                params.canvasScale * -1,
            )
        }

    }

    useComplexFormat(object){

        ScreenRender.resetCanvas()

        let objectOffset = Offscreen.getObjectXY(object)

        let focus = ScreenRender.shiftFocus(
            ScreenRender.getCanvasXYofFocusObject(
                ScreenRender.mainCanvasContext
            ),
            object,
        )

        ScreenRender.setCanvasState(
            focus,
            object.radian,
        )

        ScreenRender.mainCanvasContext.drawImage(
            ScreenRender.offscreenCanvas,
            objectOffset.x - Offscreen.width / 2,
            objectOffset.y - Offscreen.height / 2,
            Offscreen.width,
            Offscreen.height,
            0 - Offscreen.width / 2,
            0 - Offscreen.height / 2,
            Offscreen.width,
            Offscreen.height
        )

    }

    renderComplexFormat(object){

        if(!Offscreen[object.team]){
            Offscreen[object.team] = {}
        }

        if(!Offscreen[object.team][object.color]){
            Offscreen[object.team][object.color] = {}
        }

        if(!Offscreen[object.team][object.color][object.graphicID]){
            Offscreen[object.team][object.color][object.graphicID] = {}
        }


        if(
            Offscreen[object.team][object.color][object.graphicID][this.getObjectScale(object)] === undefined
        ){

            Offscreen[object.team][object.color][object.graphicID][this.getObjectScale(object)] = Offscreen.lenght

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
                        "x": Offscreen.getOffsetX() + (params.offset.x * this.getObjectScale(object)),
                        "y": Offscreen.getOffsetY() + (params.offset.y * this.getObjectScale(object))
                    },
                    0,
                    params.canvasScale,
                    params.canvasScale,
                    ScreenRender.offscreenCanvasContext
                )

                ScreenRender[functionName](params, ScreenRender.offscreenCanvasContext)

                this.mirror(object, functionName, params)
    
            }
            
            //this.drawSeparetorLine(object) // debug

            Offscreen.lenght += 1

        }

        this.useComplexFormat(object)

    }

    drawSeparetorLine(object){

        ScreenRender.drawLine(
            {
                "positions": [
                    [
                        Offscreen.getOffsetX() - Offscreen.width / 2,
                        Offscreen.getOffsetY() - Offscreen.height / 2
                    ],[
                        Offscreen.getOffsetX() + Offscreen.width / 2,
                        Offscreen.getOffsetY() - Offscreen.height / 2
                    ],[
                        Offscreen.getOffsetX() + Offscreen.width / 2,
                        Offscreen.getOffsetY() + Offscreen.height / 2
                    ],[
                        Offscreen.getOffsetX() - Offscreen.width / 2,
                        Offscreen.getOffsetY() + Offscreen.height / 2
                    ],[
                        Offscreen.getOffsetX() - Offscreen.width / 2,
                        Offscreen.getOffsetY() - Offscreen.height / 2
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
                "x": Offscreen.getOffsetX(),
                "y": Offscreen.getOffsetY(),
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

    lenght = 0

    getObjectXY(object) {

        let lenght = this[object.team][object.color][object.graphicID][ComplexRender.getObjectScale(object)]

        return {
            x: this.getOffsetX(lenght),
            y: this.getOffsetY()
        }

    }

    getOffsetX(lenght = this.lenght) {
        return (this.width * lenght) + (this.width / 2 )
    }

    getOffsetY() {
        return this.height / 2
    }

}

const Offscreen = new offscreen()

var ComplexRender = new ComplexRenderController()