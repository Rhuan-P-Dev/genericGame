import { GameStateController } from "../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

})

const shipTemplate = {
    "ID":"ID",
    "color":"pink",

    "x":0,
    "y":0,

    "width":5,
    "height":5,

    "stepMult":0.25,
    "xStepMult":0.25,
    "yStepMult":0.25,
    "yMult":1,
    "xMult":0,
    "xyMultLimit":1,

    "vel":0.25,
    "maxVel":2,
    "currentXVel":0,
    "currentYVel":0,

    "frontLineMult":7,

    "AI":{
        "type":"missile",
        "target":"player"
    }
}

export class ShipCreatorController{

    mainCanvas = document.getElementById("mainCanvas")

    createShip(isPlayer){
        let newShip = ShipCreator.createShipFactory()

        if(isPlayer){
            newShip.ID = "player"
            newShip.color = "green"
            newShip.vel *= 2
            newShip.maxVel *= 2
            delete newShip.AI
        }

        let AI = false

        if(!isPlayer){
            newShip.AI.target = GameState.getObject("player")
            AI = true
        }

        GameState.addObject(newShip, AI)

    }

    createShipFactory(){

        let newShip = structuredClone(shipTemplate)
        
        newShip.ID = randomUniqueID()
        newShip.x = randomInteger(0,ShipCreator.mainCanvas.width)
        newShip.y = randomInteger(0,ShipCreator.mainCanvas.height)

        return newShip

    }

}

var ShipCreator = new ShipCreatorController()