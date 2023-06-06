
const GAME = {}

GAME.allInOne = {}

GAME.render = {}
GAME.physics = {}
GAME.rules = {}

GAME.AI = {}

export class GameStateController {

    addObject(object, AI = false, render = true, physics = true, rules = true){

        GAME.allInOne[object.ID] = object

        if(AI){
            GAME.AI[object.ID] = object
        }

        if(render){
            GAME.render[object.ID] = object
        }

        if(physics){
            GAME.physics[object.ID] = object
        }

        if(rules){
            GAME.rules[object.ID] = object
        }

    }

    removeObject(ID){
        delete GAME.allInOne[ID]
        delete GAME.render[ID]
        delete GAME.physics[ID]
        delete GAME.rules[ID]
        delete GAME.AI[ID]
    }

    getObject(ID){
        return GAME.allInOne[ID]
    }

    getAllAI(){
        return GAME.AI
    }

    getAllObjectsRules(){
        return GAME.rules
    }

    getAllObjectsPhysics(){
        return GAME.physics
    }

    getAllObjectsRender(){
        return GAME.render
    }

}

var GameState = new GameStateController()