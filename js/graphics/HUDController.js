import { ShipLogicController } from "../ship/shipLogicController.js"

var ShipLogic = ""

onInit(function(){

    ShipLogic = new ShipLogicController()

})

export class HUDController {

    HP = document.getElementById("HP")
    energy = document.getElementById("energy")

    updateHUD(){
        HUD.HUD()
    }

    HUD(){

        let player = ShipLogic.getPlayer()
        
        if(!player){return}

        this.HP.innerHTML = parseInt(player.life)
        this.energy.innerHTML = parseInt(player.energy)

    }
}

var HUD = new HUDController()