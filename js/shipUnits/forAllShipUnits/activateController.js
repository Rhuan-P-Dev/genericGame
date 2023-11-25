
import { GameStateController } from "../../gameState/gameStateController.js"

var GameState = ""

onInit(function(){

    GameState = new GameStateController()

})

export class ActivateController{

    useActivate(object, ID){

        let activate = object.activates[ID]

        let cost = activate.cost

        let result = {}

        result.activate = activate

        if(object.energy >= cost && activate.reloadTemp <= 0){

            object.energy -= cost

            activate.reloadTemp = activate.reload

            result.activate = activate
            result.return = activate.func(object, activate, activate.config)

        }

        return result

    }

    basicAjustObject(master, activate, object){

        object.ID = randomUniqueID()
        object.team = master.team

        object.color = master.color

        object.x = master.x
        object.y = master.y

        object.currentXVel = master.currentXVel * activate.currentVelMult
        object.currentYVel = master.currentYVel * activate.currentVelMult

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

}