import { GameStateController } from "../gameState/gameStateController.js"
import { FPSController } from "../misc/FPSController.js"
import { ScreenRenderController } from "./screenRenderController.js"

var GameState = ""
var ScreenRender = ""
var FPSC

onInit(function(){

    GameState = new GameStateController()
    ScreenRender = new ScreenRenderController()
    FPSC = new FPSController()

})

export class StatusbarController {

    update(){

        if(FPSC.getFPS() < FPSC.FPSCap){return}

        let allObjectsRenderable = GameState.getAllObjectsRender()

        for(let objectName in allObjectsRenderable){
            let object = allObjectsRenderable[objectName]

            if(object.priority < 3){continue}

            Statusbar.renderStatus(object)

        }

    }

    statusTable = {
        "above": [
            { name: "life", max: "maxLife", color: "red"},
            { name: "shield", max: "maxShield", color: "lightblue"},
        ],
        "below": [
            { name: "energy", max: "maxEnergy", color: "rgb(200, 200, 0)"},
            { name: "divineEnergy", max: "maxDivineEnergy", color: "yellow"},
            { name: "darkEnergy", max: "maxDarkEnergy", color: "purple"},
            { name: "selfSwarmProduction", max: "selfSwarmProductionMax", color: "green"},
        ],
    }

    renderStatus(object){

        for(let direction in this.statusTable){

            let position = direction === "above" ? 1 : -1

            for (let index = 0; index < this.statusTable[direction].length; index++) {

                let status = this.statusTable[direction][index]
    
                if (!object.hasOwnProperty(status.name) || !object.hasOwnProperty(status.max)) {
                    continue
                }
    
                let stat = typeof object[status.name] == "number" ? object[status.name] : object[status.name].get()
    
                this.renderStat(
                    object,
                    {
                        start: { x: 25, y: (object.height*2) * position },
                        end: { x: 25, y: (object.height*2) * position },
                        formula: stat / object[status.max],
                        lineWidth: 2,
                        color: status.color,
                    }
                )
    
                position += direction === "above" ? 0.5 : -0.5
                
            }

        }

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

    renderStars(object, stat, position, color){
        const starSize = 4
        const spacing = 15
        const startX = object.x - 25
        const startY = object.y - (object.height*2) * position

        for (let i = 0; i < stat; i++) {
            const x = startX + i * spacing
            const y = startY
            this.drawStar(x, y, starSize, color)
        }
    }

}

var Statusbar = new StatusbarController()