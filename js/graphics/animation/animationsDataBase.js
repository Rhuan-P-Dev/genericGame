
import { GameStateController } from "../../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

})

export class AnimationsDataBase {

    database = {
        "caveira": {
            /*"bola": {
                "func": "drawLine",

                "loop": 60,
                "frameInterval": 1,
                "frameIntervalIncremental": 1,

                "frameInterpolation": "linar",

                "frameRate": 60,
                
                "frames": [
                    {
                        0: {
                            0: 500,
                            1: 250,
                        },
                        1: {
                            0: 50,
                            1: 50
                        },
                        2: {
                            0: 800,
                            1: 900
                        },
                    },{
                        1: {
                            0: 800,
                            1: 180
                        }
                    },{
                        1: {
                            0: 251,
                            1: 251,
                        }
                    },{
                        0: {
                            0: 800,
                            1: 500,
                        },
                        1: {
                            0: 500,
                            1: 400,
                        }
                    },
                ]
            },*/
            "sim": {
                "func": "drawLine",

                "loop": 1,
                "frameInterval": 1,
                "frameIntervalIncremental": 1,

                "frameInterpolation": "linar",

                "seconds": 10,
                "frameRate": 60, // hardcoded?
                
                "frames": [
                    {
                        0: {
                            0: 500,
                            1: 250,
                        },
                        1: {
                            0: 50,
                            1: 50
                        },
                        2: {
                            0: 600,
                            1: 50
                        }
                    },{
                        1: {
                            0: 800,
                            1: 180
                        }
                    },{
                        0: {
                            0: 0,
                            1: 180
                        }
                    },{
                        1: {
                            0: -1,
                            1: 999
                        }
                    },{
                        0: {
                            0: 9999,
                        }
                    },{
                        2: {
                            1: 100,
                        }
                    }
                    
                ]
            },
        },
        "heal": {
            "0":{"func":"writeText","loop":1,"seconds":10,"frameRate":60,"frames":{"color":[{"0":{"0":0,"1":0,"2":0}}],"lineWidth":[1],"fill":[false],"xy":[{"x":0,"y":-9}],"text":["...","WAKE UP!"],"fontSize":[3]}},"1":{"func":"drawCircle","loop":1,"seconds":10,"frameRate":60,"frames":{"color":[{"0":{"0":0,"1":0,"2":0}}],"lineWidth":[1],"fill":[true,false],"xy":[{"x":0,"y":0}],"radius":[12]}},"2":{"func":"drawLine","loop":1,"seconds":10,"frameRate":60,"frames":{"color":[{"0":{"0":0,"1":0,"2":0}}],"lineWidth":[1],"fill":[false],"continuous":[{"0":{"0":-18,"1":-6},"1":{"0":-18,"1":-6},"2":{"0":0,"1":-6},"3":{"0":0,"1":-6},"4":{"0":18,"1":-6},"5":{"0":18,"1":-6},"6":{"0":18,"1":6},"7":{"0":18,"1":6},"8":{"0":-18,"1":6},"9":{"0":-18,"1":6},"10":{"0":-18,"1":-6}},{"0":{"1":6}}]}}
        },
    }

    get(animation){
        return this.database[animation]
    }

}