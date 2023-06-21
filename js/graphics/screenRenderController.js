
import { GameStateController } from "../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

})

export class ScreenRenderController {

    mainCanvas = document.getElementById("mainCanvas")
    mainCanvasContext = mainCanvas.getContext("2d")

    updateRender(){
        ScreenRender.render()
    }

    render(){
        
        ScreenRender.clean()

        let allObjectsRenderable = GameState.getAllObjectsRender()

        for(let objectName in allObjectsRenderable){
            let object = allObjectsRenderable[objectName]

            ScreenRender.renderTheFrontOfShip(object)
            ScreenRender.renderComplexFormat(object)

        }

    }

    clean(){
        ScreenRender.mainCanvasContext.clearRect(0,0,ScreenRender.mainCanvas.width,ScreenRender.mainCanvas.height)
    }

    renderTheFrontOfShip(object){

        let X = 730

        ScreenRender.mainCanvasContext.beginPath()
        ScreenRender.mainCanvasContext.moveTo(object.x, object.y)
        ScreenRender.mainCanvasContext.lineTo(
            object.x + ( ( object.width/2 ) * object.xMult ) * object.frontLineMult
            ,
            object.y + ( ( object.height/2 ) * object.yMult ) * object.frontLineMult
        )
        ScreenRender.mainCanvasContext.closePath()
        ScreenRender.mainCanvasContext.stroke()

        return

        if(object.ID != "player"){return}

        object.x = 20
        object.y = 20

        ScreenRender.mainCanvasContext.beginPath()
        ScreenRender.mainCanvasContext.moveTo(object.x, object.y)
        ScreenRender.mainCanvasContext.lineTo(object.x+X, object.y)
        ScreenRender.mainCanvasContext.closePath()
        ScreenRender.mainCanvasContext.stroke()

        ScreenRender.mainCanvasContext.beginPath()
        ScreenRender.mainCanvasContext.moveTo(object.x, object.y)
        ScreenRender.mainCanvasContext.lineTo(object.x, object.y+X)
        ScreenRender.mainCanvasContext.closePath()
        ScreenRender.mainCanvasContext.stroke()

    }

    renderComplexFormat(object){

        ScreenRender.mainCanvasContext.fillStyle = object.color

        ScreenRender.mainCanvasContext.beginPath()
        ScreenRender.mainCanvasContext.moveTo(object.x - object.width, object.y - object.height)
        ScreenRender.mainCanvasContext.lineTo(object.x + object.width, object.y - object.height)
        ScreenRender.mainCanvasContext.lineTo(object.x + object.width, object.y + object.height)
        ScreenRender.mainCanvasContext.lineTo(object.x - object.width, object.y + object.height)
        ScreenRender.mainCanvasContext.fill()

    }

}

var ScreenRender = new ScreenRenderController()