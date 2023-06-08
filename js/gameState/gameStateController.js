
const GAME = {}

GAME.allInOne = {}

GAME.render = {}
GAME.physics = {}
GAME.rules = {}

GAME.AI = {}

GAME.team = {}

GAME.team.playerTeam = {}
GAME.team.enemyTeam = {}

export class GameStateController {

    addObject(object, AI = false, render = true, physics = true, rules = true){

        GAME.allInOne[object.ID] = object

        GAME.team[object.team][object.ID] = object

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

    removeObject(object){
        for(let area in GAME){
            delete GAME[area][object.ID]
        }
        delete GAME.team[object.team][object.ID]
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

    getAllObjectsTeam(){
        return GAME.team
    }

}

var GameState = new GameStateController()