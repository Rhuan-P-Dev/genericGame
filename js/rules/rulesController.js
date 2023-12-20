import { GameStateController } from "../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

})

export class RulesController {

    mainCanvas = document.getElementById("mainCanvas")

    maxVel = 200

    update(){

        let allObjectsRules = GameState.getAllObjectsRules()

        for(let objectName in allObjectsRules){
            let object = allObjectsRules[objectName]

            Rules.screen(object)
            Rules.stats(object)
            //Rules.activates(object)
            Rules.physics(object)

        }
    }

    physics(object){

        if(object.currentXVel > this.maxVel){
            object.currentXVel = this.maxVel
        }else if(object.currentXVel < -this.maxVel){
            object.currentXVel = -this.maxVel
        }

        if(object.currentYVel > this.maxVel){
            object.currentYVel = this.maxVel
        }else if(object.currentYVel < -this.maxVel){
            object.currentYVel = -this.maxVel
        }

    }

    screen(object){

        if(object.x < 0){
            object.x = Rules.mainCanvas.offsetWidth - object.width
        }

        if(object.x > Rules.mainCanvas.offsetWidth){
            object.x = object.width
        }

        if(object.y < 0){
            object.y = Rules.mainCanvas.offsetHeight - object.height
        }

        if(object.y > Rules.mainCanvas.offsetHeight){
            object.y = object.height
        }

    }

    stats(object){

        if(object.life > object.maxLife){
            object.life = object.maxLife
        }

        if(object.energy > object.maxEnergy){
            object.energy = object.maxEnergy
        }

        if(object.shield !== undefined){
            if(object.shield > object.maxShield){
                object.shield = object.maxShield
            }
        }

        if(object.life <= 0){

            object.onDeath.run({
                "object": object
            })

        }

        if(
            typeof(object.lifeTime) == "number"
            &&
            object.lifeTime <= 0
        ){

            object.onDeath.run({
                "object": object
            })

        }


    }

    activates(object){

        return

        for(let activateName in object.activates){
            let activate = object.activates[activateName]

            if(activate.reloadTemp < 0){ //useless?
                activate.reloadTemp = 0
            }

        }

    }

}

var Rules = new RulesController()