import { CloneObjectController } from "../generalUtils/cloneObject.js"
import { ComplexShapesDatabaseController } from "./complexShapes/complexShapesDatabaseController.js"
import { ScreenRenderController } from "./screenRenderController.js"

var Clone = ""
var ScreenRender = ""
var ComplexShapesDatabase

onInit(function(){

    Clone = new CloneObjectController()
    ScreenRender = new ScreenRenderController()
    ComplexShapesDatabase = new ComplexShapesDatabaseController()

})

export class ComplexRenderController {

    lineWidthMult = 0.25

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

            params.lineWidth *= scale * this.lineWidthMult

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
            params.lineWidth *= scale * this.lineWidthMult

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

    configObjectRender(
        object,
        drawInstructions = ComplexShapesDatabase.get(object.graphicID, false)
    ){

        for (let index = 0; index < drawInstructions.length; index++) {

            let drawInstruction = drawInstructions[index]

            let originalParams = drawInstruction.params

            if(originalParams.objectColor){

                originalParams.color = object.color

            }

        }

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

    mirrorFunction(functionName, params, scaleX, scaleY, object){

        ScreenRender.setCanvasState(
            params.offset,
            params.rotation,
            scaleX,
            scaleY,
        )

        ScreenRender[functionName](params)

        ScreenRender.reset(object)

    }

    mirror(functionName, params, object){

        ScreenRender.reset(object)

        if(params.xMirror){
            this.mirrorFunction(
                functionName,
                params,
                params.canvasScale * -1,
                params.canvasScale,
                object
            )
        }

        if(params.yMirror){
            this.mirrorFunction(
                functionName,
                params,
                params.canvasScale,
                params.canvasScale * -1,
                object
            )
        }

        if(params.xyMirror){
            this.mirrorFunction(
                functionName,
                params,
                params.canvasScale * -1,
                params.canvasScale * -1,
                object
            )
        }

    }

    renderComplexFormat(object){

        let drawInstructions = ComplexShapesDatabase.get(object.graphicID, false)

        //if(object.graphicRender.configurate){

            this.configObjectRender(object, drawInstructions)

        //}

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
            
            if(params.canvasScale !== undefined){
                params.canvasScale += 1
                ScreenRender.applyConfig(params)
            }

            ScreenRender[functionName](params)

            if(params.canvasScale !== undefined){
                this.mirror(functionName, params, object)
            }

        }

    }

}