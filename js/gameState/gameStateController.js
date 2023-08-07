
const GAME = {}

GAME.allInOne = {}

GAME.render = {}
GAME.physics = {}
GAME.rules = {}
GAME.stats = {}

GAME.AI = {}

GAME.team = {}

GAME.team.playerTeam = {}
GAME.team.enemyTeam = {}
GAME.team.neutralTeam = {}

let player = undefined

export class GameStateController {

    setPlayer(object){
        player = object
    }

    getPlayer(){
        return player
    }

    addObject(object, AI = false, team = true, render = true, physics = true, rules = true, stats = true){

        GAME.allInOne[object.ID] = object

        if(team){
            GAME.team[object.team][object.ID] = object
        }

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

        if(stats){
            GAME.stats[object.ID] = object
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

    getAllObjectsStatus(){
        return GAME.stats
    }

}

var GameState = new GameStateController()