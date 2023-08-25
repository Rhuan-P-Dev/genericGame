
import { GameStateController } from "../../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

})

export class AnimationsDataBase {

    constructor(){

    }

    database = {
        "caveira": {
            "bola": {
                "func": "drawLine",
                "frames": {
                    "frame_0": {
                        0: {
                            0: 0,
                            1: 0
                        },
                        1: {
                            0: 50,
                            1: 50
                        }
                    },
                    "frame_1": {
                        0: {
                            0: 50,
                            1: 50
                        },
                        1: {
                            0: 80,
                            1: 80
                        }
                    },
                    "frame_2": {
                        0: {
                            0: 80,
                            1: 80
                        },
                        1: {
                            0: 251,
                            1: 251,
                        }
                    },
                }
            }
        }
    }

    get(animation){
        return this.database[animation]
    }

}