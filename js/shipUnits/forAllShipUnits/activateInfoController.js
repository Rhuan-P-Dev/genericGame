import { DefenseController } from "../defense/defenseController.js"
import { DefenseInfoController } from "../defense/info/defenseInfoController.js"
import { FactoryController } from "../factory/factoryController.js"
import { FactoryInfoController } from "../factory/info/factoryInfoController.js"
import { SpecialInfoController } from "../special/info/specialInfoController.js"
import { SpecialController } from "../special/specialController.js"
import { WeaponsInfoController } from "../weapons/info/weaponsInfoController.js"
import { WeaponsController } from "../weapons/weaponsController.js"

onInit(function(){

})

export class ActivateInfoController{

    useType = {
        "special": new SpecialController().useSpecial,
        "factory": new FactoryController().useFactory,
        "defense": new DefenseController().useDefense,
        "weapon": new WeaponsController().useWeapon,
    }

    loaderType = {
        "special": new SpecialInfoController(),
        "factory": new FactoryInfoController(),
        "defense": new DefenseInfoController(),
        "weapon": new WeaponsInfoController(),
    }

    getLoarders(){
        return this.loaderType
    }

    getAll(){

        return {
            "special": new SpecialInfoController().getAll(),
            "factory": new FactoryInfoController().getAll(),
            "defense": new DefenseInfoController().getAll(),
            "weapon": new WeaponsInfoController().getAll(),
        }
    }

    get(type, activateName){

        return this.loaderType[type].get(activateName)

    }

    preBuild(activate){

        activate.ID = randomUniqueID()

        return activate

    }

    build(type, activateName, addOnGame = true){

        let activate = this.loaderType[type].build(activateName, addOnGame)

        if(!activate){return undefined}

        activate.callBack = this.useType[type]

        return activate

    }

}