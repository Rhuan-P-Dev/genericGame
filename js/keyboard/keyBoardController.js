import { ShipLogicController } from "../ship/shipLogicController.js"

var ShipLogic = ""

var keyBoardFunctions = {}

onInit(function(){

    ShipLogic = new ShipLogicController()

    keyBoardFunctions = {
        "ArrowUp":ShipLogic.advanceShip,
        "ArrowLeft":ShipLogic.rotateToLeft,
        "ArrowRight":ShipLogic.rotateToRight,
    }

})





export class KeyBoardController {

    HTML = document.querySelector("html")

    addTriggers(){
        this.HTML.addEventListener("keydown", (event) => {

            if(keyBoardFunctions[event["key"]]){

                let player = ShipLogic.getPlayer()

                if(ShipLogic.objectExist(player)){

                    keyBoardFunctions[event["key"]](player)

                }

            }

        })
    }

}

var KeyBoard = new KeyBoardController()