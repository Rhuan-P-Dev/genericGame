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

    stats(object){

        if(object.life.get() > object.maxLife){
            object.life.set(object.maxLife)
        }

        if(object.darkEnergy > object.maxDarkEnergy){
            object.darkEnergy = object.maxDarkEnergy
        }

        if(object.energy > object.maxEnergy){
            object.energy = object.maxEnergy
        }

        if(object.shield !== undefined){
            if(object.shield > object.maxShield){
                object.shield = object.maxShield
            }
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