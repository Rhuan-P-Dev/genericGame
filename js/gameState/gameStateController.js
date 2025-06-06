import { CoreAIBuilderController } from "../AI/advancedAI/coreAIBuilderController.js"
import { EffectsController } from "../effects/effectsController.js"
import { FrameController } from "../frame/frameController.js"
import { AnimationsController } from "../graphics/animation/animationsController.js"
import { ScreenRenderController } from "../graphics/screenRenderController.js"
import { KeyBoardController } from "../keyboard/keyBoardController.js"

var Effects
var Animations
var Frame
var ScreenRender
var CoreAIBuilder
var KeyBoard

onInit(function(){

    Effects = new EffectsController()
    Animations = new AnimationsController()
    Frame = new FrameController()
    ScreenRender = new ScreenRenderController()
    CoreAIBuilder = new CoreAIBuilderController()
    KeyBoard = new KeyBoardController()

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
GAME.team.arenaCloseTeam = {}
GAME.team.genocideTeam = {}

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
            //console.error("Object:", object, " is not valid.")
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

        GameState.tryAddObjectAutoWeapons(object)
        GameState.closePromises(object)
        Effects.closePromises(object)
        Animations.closePromises(object)
        KeyBoard.tryAddToPlayer(object)
    }

    closePromises(object){

        for (
            let index = 0;
            object.addActivatesPromises
            &&
            index < object.addActivatesPromises.length;
            index++
        ) {

            const func = object.addActivatesPromises[index]

            func(object)

        }

        object.addActivatesPromises = []

    }

    tryAddObjectAutoWeapons(object){

        for (const ID in object.activates) {

            const activate = object.activates[ID]

            if(!activate.auto){continue}

            GameState.addObject(activate, true, false, false, false, false, false)

        }

    }

    getObjectOperationSlots(ID){

        let object = GameState.getObject(ID)

        if(
            !this.checkObject(object)
        ){
            console.error(object)
            console.error("Object:", object, " is not valid.")
            return false
        }

        let objectExist = {}

        for (let category of ["AI", "render", "physics", "rules", "stats"]) {
            if (GAME[category][object.ID]) {
                objectExist[category] = true
            }else{
                objectExist[category] = false
            }
        }

        if(
            GAME.team[object.team]
            &&
            GAME.team[object.team][object.ID]
        ){
            objectExist["team"] = true
        }else{
            objectExist["team"] = false
        }

        return objectExist

    }

    overwriteObject(object) {
        if (!this.checkObject(object)) {
            console.error("Invalid object provided to overwriteObject:", object)
            return
        }

        let oldObject = this.getObject(object.ID)

        if (!this.checkObject(oldObject)) {
            console.error("Object to overwrite does not exist:", object.ID)
            return
        }

        let objectExist = this.getObjectOperationSlots(oldObject.ID)

        this.remove(oldObject)

        this.addObject(
            object,
            objectExist.AI,
            objectExist.team,
            objectExist.render,
            objectExist.physics,
            objectExist.rules,
            objectExist.stats
        )

        if(
            object.ID == this.getPlayer().ID
        ){
            KeyBoard.makeObjectInPlayerControl(object)
            KeyBoard.reUpdateKeyBoardKeys(object)
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

        if(
            object.ID == this.getPlayer().ID
        ){
            KeyBoard.resetKeyboardBinding()
        }

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