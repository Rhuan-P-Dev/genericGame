
import { MSP1 } from "./factory/MSP1.js"
import { SP1 } from "./factory/SP1.js"
import { DF1 } from "./factory/DF1.js"

import { ActivateInfoController } from "../../forAllShipUnits/activateInfoController.js"

var ActivateInfo = ""

onInit(function(){

    ActivateInfo = new ActivateInfoController()

})


export class FactoryInfoController{

    factorys = {
        "SP1": SP1,
        "MSP1": MSP1,
        "DF1": DF1,
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

        factory = ActivateInfo.preBuild(new factory())

        return factory

    }

}