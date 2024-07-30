import { GameStateController } from "../gameState/gameStateController.js"
import { ScreenRenderController } from "./screenRenderController.js"

var GameState = ""
var ScreenRender = ""

onInit(function(){

    GameState = new GameStateController()
    ScreenRender = new ScreenRenderController()

})

export class StatusbarController {

    update(){

        let allObjectsRenderable = GameState.getAllObjectsRender()

        for(let objectName in allObjectsRenderable){
            let object = allObjectsRenderable[objectName]

            if(object.priority < 3){continue}

            Statusbar.renderStatus(object)

        }

    }

    renderStatus(object){

        const statusTable = [
            { name: "darkEnergy", max: "maxDarkEnergy", color: "purple", position: -1.5},
            { name: "energy", max: "maxEnergy", color: "yellow", position: -1},
            { name: "life", max: "maxLife", color: "red", position: 1},
            { name: "shield", max: "maxShield", color: "lightblue", position: 1.5},
        ]

        statusTable.forEach((status) => {
            if (!object.hasOwnProperty(status.name) || !object.hasOwnProperty(status.max)) {
                return
            }

            let stat = typeof object[status.name] == "number" ? object[status.name] : object[status.name].get()
            
            this.renderStat(
                object,
                {
                    start: { x: 25, y: (object.height*2) * status.position },
                    end: { x: 25, y: (object.height*2) * status.position },
                    formula: stat / object[status.max],
                    lineWidth: 2,
                    color: status.color,
                }
            )
        })

    }

    renderStat(object, params){

        ScreenRender.addDrawRequest(
            {
                "func": ScreenRender.drawLine,
                "params": {
                    "positions": [
                        [
                            (object.x - params.start.x) - params.lineWidth,
                            (object.y - params.start.y) + params.lineWidth
                        ],
                        [
                            ((object.x - params.end.x ) + params.start.x*2) + params.lineWidth,
                            (object.y - params.end.y) + params.lineWidth
                        ],
                        [
                            ((object.x - params.end.x ) + params.start.x*2) + params.lineWidth,
                            (object.y - params.end.y) - params.lineWidth
                        ],
                        [
                            (object.x - params.start.x) - params.lineWidth,
                            (object.y - params.start.y) - params.lineWidth
                        ],
                    ],
                    "color": "black",
                    "lineWidth": params.lineWidth,
                    "fill": true,
                }
            }
        
        )

        ScreenRender.addDrawRequest(
            {
                "func": ScreenRender.drawLine,
                "params": {
                    "positions": [
                        [
                            object.x - params.start.x,
                            object.y - params.start.y,
                        ],[
                            (object.x - params.end.x) + alwaysPositive( (params.start.x*2) * params.formula ),
                            object.y - params.end.y,
                        ]
                    ],
                    "color": params.color,
                    "lineWidth": params.lineWidth
                }
            }
        
        )

    }

}

var Statusbar = new StatusbarController()