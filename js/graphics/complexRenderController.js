import { GameStateController } from "../gameState/gameStateController.js"
import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { ComplexShapesDatabaseController } from "./complexShapes/complexShapesDatabaseController.js"
import { ScreenRenderController } from "./screenRenderController.js"

var Clone = ""
var ScreenRender = ""
var ComplexShapesDatabase
var GameState

var Offscreen

onInit(function(){

    Clone = new CloneObjectController()
    ScreenRender = new ScreenRenderController()
    ComplexShapesDatabase = new ComplexShapesDatabaseController()
    GameState = new GameStateController()

    Offscreen = new offscreen()

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
            params.rotation,
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

    renderComplexFormat(
        object,
        targetScreen = ScreenRender.mainCanvasContext,
    ){

        if(
            Offscreen.get(object) === undefined
        ){

            Offscreen.add(object)

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
                    params.rotation,
                    params.canvasScale,
                    params.canvasScale,
                    ScreenRender.offscreenCanvasContext
                )

                ScreenRender[functionName](params, ScreenRender.offscreenCanvasContext)

                this.mirror(object, functionName, params)
    
            }
            
            //this.drawSeparetorLine(object) // debug

        }

        this.useComplexFormat(object, targetScreen)

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

    constructor(canvas = ScreenRender.offscreenCanvas){
        this.height = canvas.height

        this.width = canvas.height
    }

    length = 0

    cache = {}

    add(object) {

        if(ScreenRender.offscreenCanvas.width <= this.width * (this.length+1)){this.reset()}

        if(!this.cache[object.team]){
            this.cache[object.team] = {}
        }

        if(!this.cache[object.team][object.color]){
            this.cache[object.team][object.color] = {}
        }

        if(!this.cache[object.team][object.color][object.graphicID]){
            this.cache[object.team][object.color][object.graphicID] = {}
        }

        this.cache[object.team][object.color][object.graphicID][ComplexRender.getObjectScale(object)] = this.length

        this.length += 1

    }

    get(object) {
        if(!this.cache[object.team]){return undefined}
        if(!this.cache[object.team][object.color]){return undefined}
        if(!this.cache[object.team][object.color][object.graphicID]){return undefined}
        return this.cache[object.team][object.color][object.graphicID][ComplexRender.getObjectScale(object)]
    }

    getObjectXY(object) {

        let length = this.get(object)

        return {
            x: this.getOffsetX(length),
            y: this.getOffsetY()
        }

    }

    getOffsetX(length = this.length-1) {
        return (this.width * length) + (this.width / 2 )
    }

    getOffsetY() {
        return this.height / 2
    }

    reset() {

        this.length = 0
        this.cache = {}
        ScreenRender.clean(
            ScreenRender.offscreenCanvasContext
        )
    }

}

var ComplexRender = new ComplexRenderController()