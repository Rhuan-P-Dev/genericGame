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
        drawInstructions = ComplexShapesDatabase.get(object.graphicID)
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

    renderComplexFormat(object){

        let drawInstructions = ComplexShapesDatabase.get(object.graphicID)

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

            ScreenRender[functionName](params)

        }

    }

}