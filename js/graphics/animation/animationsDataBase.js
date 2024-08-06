
import { GameStateController } from "../../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

})

export class AnimationsDataBase {

    database = {
        "heal": {
            "0":{"func":"drawLine","loop":1,"seconds":0.15,"frameRate":60,"frames":{"color":[{"0":{"0":255,"1":0,"2":0}}],"lineWidth":[2],"fill":[false],"continuous":[{"0":{"0":-3,"1":0},"1":{"0":-3,"1":0},"2":{"0":3,"1":0},"3":{"0":3,"1":0},"4":{"0":0,"1":0},"5":{"0":0,"1":0},"6":{"0":0,"1":-3},"7":{"0":0,"1":-3},"8":{"0":0,"1":3}}]}}
        },
        "fire":{
            "0":{"func":"drawLine","loop":1,"seconds":0.3,"frameRate":60,"frames":{"color":[{"0":{"0":255,"1":115,"2":0}}],"lineWidth":[1],"fill":[true],"continuous":[{"0":{"0":-2.25,"1":2.25},"1":{"0":-2.25,"1":-2.25},"2":{"0":2.25,"1":-2.25},"3":{"0":2.25,"1":2.25}}]}}
        },
        "death":{
            "0":{"func":"drawLine","loop":1,"seconds":0.6,"frameRate":60,"frames":{"color":[{"0":{"0":0,"1":0,"2":0}}],"lineWidth":[1],"fill":[true],"continuous":[{"0":{"0":-2.25,"1":2.25},"1":{"0":-2.25,"1":-2.25},"2":{"0":2.25,"1":-2.25},"3":{"0":2.25,"1":2.25}}]}}
        },
        "thunder": {
            "0":{"func":"drawLine","loop":1,"seconds":0.2,"frameRate":60,"frames":{"color":[{"0":{"0":251,"1":255,"2":0}}],"lineWidth":[1],"fill":[false],"continuous":[{"0":{"0":-0.1,"1":0},"1":{"0":3.15,"1":3},"2":{"0":-4.1,"1":-1.85},"3":{"0":-2.6,"1":3.8},"4":{"0":3.15,"1":-4.9},"5":{"0":5.85,"1":1.15},"6":{"0":-3.7,"1":-3.45}}]}}
        },
        "worlds": {
            "0":{"func":"drawCircle","loop":1,"seconds":1,"frameRate":60,"frames":{"color":[{"0":{"0":0,"1":0,"2":0}}],"lineWidth":[1],"fill":[true],"xy":[{"x":-21,"y":9},{"x":-6,"y":-18},{"x":21,"y":3},{"x":-21,"y":9}],"radius":[2]}},"1":{"func":"drawCircle","loop":1,"seconds":1,"frameRate":60,"frames":{"color":[{"0":{"0":0,"1":0,"2":0}}],"lineWidth":[1],"fill":[true],"xy":[{"x":15,"y":-9},{"x":9,"y":15},{"x":-18,"y":-9},{"x":15}],"radius":[3]}},"2":{"func":"drawArc","loop":1,"seconds":1,"frameRate":60,"frames":{"color":[{"0":{"0":0,"1":0,"2":0}}],"lineWidth":[10],"fill":[true],"xy":[{"x":-12,"y":-15},{"x":24,"y":-12},{"x":-18,"y":6},{"x":-12,"y":-15}],"radius":[3],"startAngle":[0],"endAngle":[1.8]}}
        },
        "teleport":{
            "0":{"func":"drawCircle","loop":1,"seconds":0.2,"frameRate":60,"frames":{"color":[{"0":{"0":0,"1":57,"2":117}}],"lineWidth":[1],"fill":[true],"xy":[{"x":0,"y":0}],"radius":[15,15,0]}}
        },
        "camuflage":{
            "0":{"func":"drawLine","loop":1,"seconds":0.2,"frameRate":60,"frames":{"color":[{"0":{"0":166,"1":166,"2":166}}],"lineWidth":[1],"fill":[true],"continuous":[{"0":{"0":-2.25,"1":2.25},"1":{"0":-2.25,"1":-2.25},"2":{"0":2.25,"1":-2.25},"3":{"0":2.25,"1":2.25}}]}}
        },
        "taunt":{
            "0":{"func":"drawLine","loop":1,"seconds":0.5,"frameRate":60,"frames":{"color":[{"0":{"0":251,"1":255,"2":0}}],"lineWidth":[3],"fill":[false],"continuous":[{"0":{"0":0,"1":-45},"1":{"0":0,"1":-45},"2":{"0":0,"1":-12},"3":{"0":12,"1":-24},"4":{"0":0,"1":-12},"5":{"0":-12,"1":-24}}]}}
        },
        "lv up":{
            "0":{"func":"writeText","loop":1,"seconds":0.1,"frameRate":60,"frames":{"color":[{"0":{"0":224,"1":240,"2":0}}],"lineWidth":[1],"fill":[false],"xy":[{"x":0,"y":0},{"y":-6}],"text":["LV UP!"],"fontSize":[15]}}
        },
        "overclock":{
            "0":{"func":"writeText","loop":1,"seconds":0.1,"frameRate":60,"frames":{"color":[{"0":{"0":224,"1":240,"2":0}}],"lineWidth":[1],"fill":[false],"xy":[{"x":0,"y":0},{"y":-6}],"text":["OVERCLOCK!"],"fontSize":[15]}}
        },
        "turbo":{
            "0":{"func":"writeText","loop":1,"seconds":0.1,"frameRate":60,"frames":{"color":[{"0":{"0":224,"1":240,"2":0}}],"lineWidth":[1],"fill":[false],"xy":[{"x":0,"y":0},{"y":-6}],"text":["TURBO!"],"fontSize":[15]}}
        },
        "energy shield":{
            "0":{"func":"drawLine","loop":1,"seconds":0.15,"frameRate":60,"frames":{"color":[{"0":{"0":0,"1":255,"2":251}}],"lineWidth":[1],"fill":[true],"continuous":[{"0":{"0":0,"1":6.4},"1":{"0":-6.4,"1":-3.2},"2":{"0":0,"1":-6.4},"3":{"0":6.4,"1":-3.2}}]}},
            "1":{"func":"drawLine","loop":1,"seconds":0.15,"frameRate":60,"frames":{"color":[{"0":{"0":0,"1":0,"2":0}}],"lineWidth":[3],"fill":[false],"continuous":[{"0":{"0":3.2,"1":-1.6},"1":{"0":3.2,"1":-1.6},"2":{"0":3.2,"1":-4.8},"3":{"0":3.2,"1":-4.8},"4":{"0":3.2,"1":-1.6},"5":{"0":3.2,"1":-1.6},"6":{"0":3.2,"1":1.6},"7":{"0":3.2,"1":1.6},"8":{"0":3.2,"1":-1.6},"9":{"0":3.2,"1":-1.6},"10":{"0":6.4,"1":-1.6},"11":{"0":6.4,"1":-1.6},"12":{"0":3.2,"1":-1.6},"13":{"0":3.2,"1":-1.6},"14":{"0":3.2,"1":-1.6},"15":{"0":0,"1":-1.6}}]}}
        },
        "fortification":{
            "0":{"func":"drawLine","loop":1,"seconds":0.05,"frameRate":60,"frames":{"color":[{"0":{"0":0,"1":0,"2":0}}],"lineWidth":[1],"fill":[false],"continuous":[{"0":{"0":0,"1":8.75},"1":{"0":-7.5,"1":-3.75},"2":{"0":0,"1":-7.5},"3":{"0":7.5,"1":-3.75},"4":{"0":0,"1":8.75},"5":{"0":0,"1":-7.5},"6":{"0":-7.5,"1":-3.75},"7":{"0":7.5,"1":-3.75},"8":{"0":0,"1":-3.75}}]}}
        },
        "defense shield":{
            "0":{"func":"drawLine","loop":1,"seconds":0.15,"frameRate":60,"frames":{"color":[{"0":{"0":0,"1":0,"2":0}}],"lineWidth":[1],"fill":[true],"continuous":[{"0":{"0":0,"1":6.4},"1":{"0":-6.4,"1":-3.2},"2":{"0":0,"1":-6.4},"3":{"0":6.4,"1":-3.2}}]}},
            "1":{"func":"drawLine","loop":1,"seconds":0.15,"frameRate":60,"frames":{"color":[{"0":{"0":255,"1":255,"2":255}}],"lineWidth":[3],"fill":[false],"continuous":[{"0":{"0":3.2,"1":-1.6},"1":{"0":3.2,"1":-1.6},"2":{"0":3.2,"1":-4.8},"3":{"0":3.2,"1":-4.8},"4":{"0":3.2,"1":-1.6},"5":{"0":3.2,"1":-1.6},"6":{"0":3.2,"1":1.6},"7":{"0":3.2,"1":1.6},"8":{"0":3.2,"1":-1.6},"9":{"0":3.2,"1":-1.6},"10":{"0":6.4,"1":-1.6},"11":{"0":6.4,"1":-1.6},"12":{"0":3.2,"1":-1.6},"13":{"0":3.2,"1":-1.6},"14":{"0":3.2,"1":-1.6},"15":{"0":0,"1":-1.6}}]}}
        },
        "shield boost":{
            "0":{"func":"drawLine","loop":1,"seconds":0.5,"frameRate":60,"frames":{"color":[{"0":{"0":0,"1":255,"2":251}}],"lineWidth":[1],"fill":[false,true],"continuous":[{"0":{"0":0,"1":6.4},"1":{"0":-6.4,"1":-3.2},"2":{"0":0,"1":-6.4},"3":{"0":6.4,"1":-3.2}},{"0":{"1":16},"1":{"0":-12.8,"1":-9.6},"2":{"1":-16},"3":{"0":12.8,"1":-9.6}}]}}
        },
        "miracle stone":{
            "0":{"func":"drawCircle","loop":1,"seconds":0.25,"frameRate":60,"frames":{"color":[{"0":{"0":140,"1":0,"2":255}}],"lineWidth":[1,10],"fill":[false],"xy":[{"x":0,"y":0}],"radius":[1,200]}}
        },
        "resilience":{
            "0":{"func":"drawLine","loop":1,"seconds":0.3,"frameRate":60,"frames":{"color":[{"0":{"0":0,"1":0,"2":0}}],"lineWidth":[1],"fill":[true],"continuous":[{"0":{"0":0,"1":6},"1":{"0":-6,"1":-3},"2":{"0":0,"1":-6},"3":{"0":6,"1":-3}},{"0":{"1":15},"1":{"0":-12,"1":-9},"2":{"1":-15},"3":{"0":12,"1":-9}}]}},
            "1":{"func":"drawLine","loop":1,"seconds":0.3,"frameRate":60,"frames":{"color":[{"0":{"0":255,"1":255,"2":255}}],"lineWidth":[2],"fill":[false],"continuous":[{"0":{"0":-3,"1":-3},"1":{"0":3,"1":0}},{"0":{"0":-9,"1":-9},"1":{"0":6,"1":-3}}]}}
        },
        "survive instinct":{
            "0":{"func":"writeText","loop":1,"seconds":0.25,"frameRate":60,"frames":{"color":[{"0":{"0":224,"1":240,"2":0}}],"lineWidth":[1],"fill":[false],"xy":[{"x":0,"y":0},{"y":-6}],"text":["!! SURVIVE !!"],"fontSize":[20]}}
        },
        "tactic upgrade":{
            "0":{"func":"writeText","loop":1,"seconds":0.1,"frameRate":60,"frames":{"color":[{"0":{"0":224,"1":240,"2":0}}],"lineWidth":[1],"fill":[false],"xy":[{"x":0,"y":0},{"y":-6}],"text":["TACTIC UPGRADE!"],"fontSize":[15]}}
        },
        "ship dead":{
            "0":{"func":"writeText","loop":1,"seconds":0.15,"frameRate":60,"frames":{"color":[{"0":{"0":255,"1":255,"2":0}}],"lineWidth":[1],"fill":[false],"xy":[{"x":0,"y":0}],"text":["BOOOM!"],"fontSize":[20]}}
        },


        "red repulsion": {
            "0":{"func":"drawCircle","loop":1,"seconds":0.20,"frameRate":60,"frames":{"color":[{"0":{"0":255,"1":0,"2":0}}],"lineWidth":[1,10],"fill":[false],"xy":[{"x":0,"y":0}],"radius":[1,300]}}
        },

        "blue attraction": {
            "0":{"func":"drawCircle","loop":1,"seconds":0.10,"frameRate":60,"frames":{"color":[{"0":{"0":0,"1":0,"2":255}}],"lineWidth":[1,5],"fill":[false],"xy":[{"x":0,"y":0}],"radius":[55,1]}}
        },



        "trace": {
            "0":{"func":"drawLine","loop":1,"seconds":0.1,"frameRate":60,"frames":{"color":[{"0":{"0":100,"1":100,"2":100}}],"lineWidth":[1],"fill":[true],"continuous":[{"0":{"0":-2.25,"1":2.25},"1":{"0":-2.25,"1":-2.25},"2":{"0":2.25,"1":-2.25},"3":{"0":2.25,"1":2.25}}]}}
        },

        "hunted": {
            "0":{"func":"drawArc","loop":1,"seconds":0.5,"frameRate":60,"frames":{"color":[{"0":{"0":255,"1":255,"2":0}}],"lineWidth":[1],"fill":[false],"xy":[{"x":0,"y":0}],"radius":[30,15,40,30],"startAngle":[-0.63],"endAngle":[0.63]}},
            "1":{"func":"drawArc","loop":1,"seconds":0.5,"frameRate":60,"frames":{"color":[{"0":{"0":255,"1":255,"2":0}}],"lineWidth":[1],"fill":[false],"xy":[{"x":0,"y":0}],"radius":[30,15,40,30],"startAngle":[2.5],"endAngle":[3.78]}}
        }

    }

    get(animation){
        return this.database[animation]
    }

}