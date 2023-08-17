
import { GameStateController } from "../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

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

var drawRequestQueue = new DrawRequestLinkedList()

export class ScreenRenderController {

    mainCanvas = document.getElementById("mainCanvas")
    mainCanvasContext = mainCanvas.getContext("2d")

    addDrawRequest(params){

        drawRequestQueue.add(params)

    }

    runRequests(){
        drawRequestQueue.runAll()
        drawRequestQueue = new DrawRequestLinkedList()
    }

    update(){
        
        ScreenRender.clean()

        ScreenRender.runRequests()

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

        ScreenRender.mainCanvasContext.beginPath();
        ScreenRender.mainCanvasContext.arc(object.x, object.y, 100, 0, Math.PI * 2);
        ScreenRender.mainCanvasContext.stroke();

        return

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

    drawCircle(config) {

        ScreenRender.mainCanvasContext.beginPath();
        ScreenRender.mainCanvasContext.arc(
            config.x,
            config.y,
            config.radius,
            0,
            Math.PI * 2);
        ScreenRender.mainCanvasContext.stroke();

    }

    drawLine(config){

        ScreenRender.mainCanvasContext.beginPath()
        ScreenRender.mainCanvasContext.moveTo(
            config.start.x,
            config.start.y
        )
        ScreenRender.mainCanvasContext.lineTo(
            config.goal.x,
            config.goal.y
        )
        //ScreenRender.mainCanvasContext.strokeStyle = "red";
        ScreenRender.mainCanvasContext.stroke()
        ScreenRender.mainCanvasContext.closePath()

    }

}

var ScreenRender = new ScreenRenderController()