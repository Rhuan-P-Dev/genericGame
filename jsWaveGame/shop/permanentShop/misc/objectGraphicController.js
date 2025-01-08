import { ComplexRenderController } from "../../../../js/graphics/complexRenderController.js"
import { ScreenRenderController } from "../../../../js/graphics/screenRenderController.js"
import { ObjectInfoController } from "./objectInfoController.js"

var ComplexRender
var ObjectInfo
var ScreenRender

onInit(function(){

    ComplexRender = new ComplexRenderController()
    ObjectInfo = new ObjectInfoController()
    ScreenRender = new ScreenRenderController()

})

export class ObjectGraphicController {

    constructor(
        ID,
        canvasID,
        zoom = 2
    ){
        this.canvas = document.getElementById(canvasID)
        this.context = this.canvas.getContext("2d")
        this.zoom = zoom
        
        this.set(
            ID,
        )
    }

    set(
        ID,
        context = this.context,
        zoom = this.zoom,
    ){

        ScreenRender.resetCanvas(context)
        ScreenRender.clean(context)

        ObjectInfo.setObject(
            ID
        )

        let object = ObjectInfo.get()

        object.color = "green"

        object.width *= zoom
        object.height *= zoom

        ComplexRender.renderComplexFormat(
            object,
            context
        )

    }

}