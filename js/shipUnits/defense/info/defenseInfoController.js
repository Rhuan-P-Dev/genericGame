import { Regen } from "./defense/regen.js"

import { ActivateInfoController } from "../../forAllShipUnits/activateInfoController.js"

var ActivateInfo = ""

onInit(function(){

    ActivateInfo = new ActivateInfoController()

})

export class DefenseInfoController{

    defenses = {
        "regen": Regen
    }

    getAll(){
    
        return this.defenses
    
    }
    
    get(defenseName){
    
        return this.defenses[defenseName]
    
    }
    
    build(name){
    
        let defense = this.defenses[name]
    
        if(!defense){return undefined}

        defense = ActivateInfo.preBuild(new defense(true))
    
        return defense
    
    }

}