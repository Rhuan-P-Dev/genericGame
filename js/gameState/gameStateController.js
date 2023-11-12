import { EffectsController } from "../effects/effectsController.js"

var Effects = ""

onInit(function(){

    Effects = new EffectsController()

})

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

    addObject(
        object,
        AI = false,
        team = true,
        render = true,
        physics = true,
        rules = true,
        stats = true
    ){

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

        Effects.closePromises(object)

    }

    removeObType(params){

        this.remove(params.object)

    }

    remove(object){

        this.removeActivates(object)

        this.removeObject(object)

        this.removeEffects(object)

    }

    removeActivates(object){

        for(let activate in object.activates){

            if(object.activates[activate].auto){
                this.removeObject(object.activates[activate])
            }

        }

    }

    removeObject(object){

        for(let area in GAME){
            delete GAME[area][object.ID]
        }

        if(
            GAME.team[object.team]
            &&
            GAME.team[object.team][object.ID]
        ){

            delete GAME.team[object.team][object.ID]

        }

    }

    removeEffects(object){

        Effects.removeAll(object)

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

    changeTeam(object, to, from){

        delete GAME.team[to][object.ID]

        GAME.team[from][object.ID] = object

        object.team = from

    }

}

var GameState = new GameStateController()