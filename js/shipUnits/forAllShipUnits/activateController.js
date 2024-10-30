
import { setFrameOut } from "../../frame/frameController.js"
import { GameStateController } from "../../gameState/gameStateController.js"
import { WeaponsController } from "../weapons/weaponsController.js"

var GameState = ""
var Weapons

onInit(function(){

    GameState = new GameStateController()
    Weapons = new WeaponsController()

})

export class ActivateController{

    getOperations = {
        "activate cost": (object, activate) => {return activate.cost},
        "stat": (object, activate) => {return activate.consumableStat},
        "object resource": (object, activate) => {return object[activate.consumableStat]},
        "object resource / activate cost": (object, activate) => {return object[activate.consumableStat] / (activate.cost+1)},
        "object max resource": (object, activate) => {return object["max"+firstLetterUppercase(activate.consumableStat)]},
        "object resource / object max resource": (object, activate) => {return (
                object[activate.consumableStat]
                /
                object[
                    "max"+firstLetterUppercase(
                        activate.consumableStat
                    )
                ]
            )
        },
        //"activate cost * second": (object, activate) => {return activate.cost * (60/activate.reload)},
        "activate cost per second": (object, activate) => {
            return (
                (
                    object[activate.consumableStat + "Regen"] * 60
                )
                -
                (
                    (activate.cost+(1/60)) * (60/activate.reload)
                )
            )
        },
    }

    get(
        object,
        activate,
        query
    ){

        if(
            this.getOperations[query]
        ){
            return this.getOperations[query](object, activate)
        }else{
            return false
        }

    }

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

        if(
            activate.type !== "weapon"
            ||
            activate.func === Weapons.returnProjectiles
        ){
            return result
        }

        return {}

    }

    checkPrimitiveObject(master, location = master){

        if(
            master.team === undefined
            ||
            master.color === undefined
            ||
            location.x === undefined
            ||
            location.y === undefined
            ||
            location.currentXVel === undefined
            ||
            location.currentYVel === undefined
        ){
            console.error("checkPrimitiveObject - ERROR")
            return false
        }else{
            return true
        }

    }

    primitiveAjustObject(master, object, location = master){

        object.ID = randomUniqueID()
        object.team = master.team

        object.color = master.color

        object.x = location.x
        object.y = location.y

        object.currentXVel = location.currentXVel
        object.currentYVel = location.currentYVel

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