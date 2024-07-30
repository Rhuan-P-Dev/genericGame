
import { setFrameOut } from "../../frame/frameController.js"
import { GameStateController } from "../../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

})

export class ActivateController{

    useActivate(object, ID) {

        let activate = object.activates[ID]
        let consumableStat = activate.consumableStat
        let cost = activate.cost

        let result = {}

        result.activate = activate

        if (object[consumableStat] >= cost && activate.reloadTemp <= 0) {
            activate.preuseActivateObserver.run(object, activate)

            object[consumableStat] -= cost

            activate.reloadTemp = activate.reload

            result.activate = activate
            result.return = activate.func(object, activate, activate.config)

            activate.useActivateObserver.run(object, activate, result.return)

        }

        return result
    }

    primitiveAjustObject(master, object){

        object.ID = randomUniqueID()
        object.team = master.team

        object.color = master.color

        object.x = master.x
        object.y = master.y

        object.currentXVel = master.currentXVel
        object.currentYVel = master.currentYVel

    }

    basicAjustObject(master, activate, object){

        this.primitiveAjustObject(master, object)

        object.currentXVel *= activate.currentVelMult
        object.currentYVel *= activate.currentVelMult

        if(
            activate.radian
            &&
            object.radian
        ){

            object.setAngle(
                activate.getAngle()
            )

        }

    }

    addObject(object){

        let haveAI = false

        if(object.AI){
            haveAI = true
        }

        GameState.addObject(object, haveAI)
        
    }

    setStats(object, activate, config){

        for(let stat in config.stats){

            if(object[stat] !== undefined){
                typeof object[stat] == "number" ? object[stat] += config.stats[stat] : object[stat].math("+", config.stats[stat])
            }

        }

        if(config.timer){

            setFrameOut(() => {

                for(let stat in config.stats){

                    if(object[stat] !== undefined){
                        typeof object[stat] == "number" ? object[stat] -= config.stats[stat] : object[stat].math("-", config.stats[stat])
                    }
        
                }

            }, config.timer)

        }

    }

    setPercentageStats(object, activate, config){

        for(let stat in config.stats){

            if(object[stat] !== undefined){
                if(typeof object[stat] == "number"){//-----v future erro?
                    object[stat] += object["max" + firstLetterUppercase(stat)] * config.stats[stat]
                }else{
                    object[stat].math("+", object["max" + firstLetterUppercase(stat)] * config.stats[stat])
                }
            }

        }

        if(config.timer){

            setFrameOut(() => {

                for(let stat in config.stats){

                    if(object[stat] !== undefined){
                        if(typeof object[stat] == "number"){//-----v future erro?
                            object[stat] -= object["max" + firstLetterUppercase(stat)] * config.stats[stat]
                        }else{
                            object[stat].math("-", object["max" + firstLetterUppercase(stat)] * config.stats[stat])
                        }
                    }
        
                }

            }, config.timer)

        }

    }

}