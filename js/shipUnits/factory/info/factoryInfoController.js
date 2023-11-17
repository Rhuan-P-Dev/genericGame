
import { MovableSaferPerimeter1 } from "./factory/movableSaferPerimeter1.js"
import { SaferPerimeter1 } from "./factory/saferPerimeter1.js"
import { BasicSafeZone1 } from "./factory/basicSafeZone1.js"

import { ActivateInfoController } from "../../forAllShipUnits/activateInfoController.js"
import { MineSeeder1 } from "./factory/mineSeeder1.js"

var ActivateInfo = ""

onInit(function(){

    ActivateInfo = new ActivateInfoController()

})


export class FactoryInfoController{

    factorys = {
        "safer perimeter 1": SaferPerimeter1,
        "movable safer perimeter 1": MovableSaferPerimeter1,
        "basic safe zone 1": BasicSafeZone1,
        "mine seeder 1": MineSeeder1,
    }

    getAll(){

        return this.factorys

    }

    get(factoryName){

        return this.factorys[factoryName]

    }

    build(factoryName){

        let factory = this.factorys[factoryName]

        if(!factory){return undefined}

        factory = ActivateInfo.preBuild(new factory(true))

        return factory

    }

}