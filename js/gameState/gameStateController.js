import { CoreAIBuilderController } from "../AI/advancedAI/coreAIBuilderController.js"
import { EffectsController } from "../effects/effectsController.js"
import { FrameController } from "../frame/frameController.js"
import { AnimationsController } from "../graphics/animation/animationsController.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"

var Effects
var Animations
var Frame
var ScreenRender
var CoreAIBuilder

onInit(function(){

    Effects = new EffectsController()
    Animations = new AnimationsController()
    Frame = new FrameController()
    ScreenRender = new ScreenRenderController()
    CoreAIBuilder = new CoreAIBuilderController()

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

let player = {
    "ID": "undefined",
}

export class GameStateController {

    getObjectsNumber(team){
        return Object.keys(GAME.team[team]).length
    }

    restart(){

        for(let index in GAME.allInOne){

            this.remove(GAME.allInOne[index])

        }

        Frame.restart()
        CoreAIBuilder.restart()

    }

    setPlayer(object){
        player = object
        //ugly
        ScreenRender.setFocusObject(object)
    }

    getPlayer(){
        return player
    }

    removeFrom(type, object){
        if(GAME[type]){
            delete GAME[type][object.ID]
        }else{
            console.error(`Type ${type} not found in game state.`)
        }
    }

    addTo(type, object){

        if(
            GAME[type]
            &&
            GAME[type][object.ID] == undefined
            &&
            this.checkObject(object)
        ){
            GAME[type][object.ID] = object
        }else{
            console.error(`Object ${object.ID} already exists in game state or is invalid.`)
        }
    }

    checkObject(object){

        if(
            object === undefined
            ||
            object.ID === undefined
            ||
            object.ID === "newID"
            //||
            //GAME.team[object.team] === undefined
        ){
            return false
        }else{
            return true
        }

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

        if(
            !this.checkObject(object)
        ){
            console.error("Object:", object, " is not valid.")
            return false
        }

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
        Animations.closePromises(object)
    tryAddObjectAutoWeapons(object){

        for (const ID in object.activates) {

            const activate = object.activates[ID]

            if(!activate.auto){continue}

            GameState.addObject(activate, true, false, false, false, false, false)

        }

    }


    }

    removeObType(params){

        this.remove(params.object)

    }

    remove(object){

        this.removeActivates(object)

        this.removeObject(object)

        this.removeEffects(object)

        this.removeAnimations(object)

        object.disableResuls = {}

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

    removeAnimations(object){

        Animations.removeAll(object)

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

    changeTeam(oldTeam, newTeam, skipCheck = false){

        if(
            (
                !this.checkObject(oldTeam)
                ||
                !this.checkObject(newTeam)
            )
            &&
            !skipCheck
        ){return}

        delete GAME.team[oldTeam.team][oldTeam.ID]

        GAME.team[newTeam.team][oldTeam.ID] = oldTeam

        oldTeam.team = newTeam.team

        oldTeam.color = newTeam.color

    }

}

var GameState = new GameStateController()