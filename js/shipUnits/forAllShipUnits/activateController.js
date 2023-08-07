
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

            result.return = activate.func(object, activate, activate.config)

        }

        return result

    }

    basicAjustObject(master, object){

        object.ID = randomUniqueID()
        object.team = master.team

        object.color = master.color

        object.x = master.x
        object.y = master.y

    }

    addObject(object){

        if(object.AI){
            var haveAI = true
        }else{
            var haveAI = false
        }

        GameState.addObject(object, haveAI)
        
    }

}