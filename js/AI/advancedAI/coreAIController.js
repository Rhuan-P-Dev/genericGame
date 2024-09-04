import { GetSignalStrengthController } from "./getSignalStrengthController.js"
import { AdvancedAITypesController } from "./advancedAITypesController.js"
import { GetParametersController } from "./getParametersController.js"
import { ActivateController } from "../../shipUnits/forAllShipUnits/activateController.js"
import { CoreAIBuilderController } from "./coreAIBuilderController.js"

var GetSignalStrength
var AdvancedAITypes
var GetParameters
var Activate
var CoreAIBuilder

onInit(function(){

    GetSignalStrength = new GetSignalStrengthController()
    AdvancedAITypes = new AdvancedAITypesController()
    GetParameters = new GetParametersController()
    Activate = new ActivateController()
    CoreAIBuilder = new CoreAIBuilderController()

})

const AIActionTypes = {
    "missileV1": "movable",
    "flee": "movable",
    "movable": "movable",
    "escortAlly": "movable",

    "rotableTurret": "movable",

    "useActivates": "activate",
}

const TRASH = {}

export class CoreAIController {

    getLimitedDoObject(object, AI, core){

        let limitedDoObject = {}

        AI.forEach(AIType => {

            if(!AIActionTypes[AIType]){return}

            if(
                !AdvancedAITypes.get(AIType)
            ){
                return
            }

            let result = AdvancedAITypes.get(AIType)(object, core)

            if(!result){return}

            if(!limitedDoObject[AIActionTypes[AIType]]){
                limitedDoObject[AIActionTypes[AIType]] = []
            }

            if(
                Array.isArray(result)
            ){
                result.forEach(item => {

                    if(!item){return}

                    item.type = AIType

                    item.actionStrength = GetSignalStrength.getActionStrength(
                        item.params,
                        AIType,
                        core
                    )

                    if(
                        item.params.activate
                    ){

                        let energySource = Activate.get(
                            null,
                            item.params.activate,
                            "stat"
                        )

                        if (!limitedDoObject[AIActionTypes[AIType]][energySource]) {
                            limitedDoObject[AIActionTypes[AIType]][energySource] = []
                        }
        
                        limitedDoObject[AIActionTypes[AIType]][energySource].push(item)
                    }else{
                        limitedDoObject[AIActionTypes[AIType]].push(item)
                    }

                })

            }else{

                result.actionStrength = GetSignalStrength.getActionStrength(
                    result.params,
                    AIType,
                    core
                )

                result.type = AIType

                if(
                    result.params.activate
                ){

                    let energySource = Activate.get(
                        null,
                        result.params.activate,
                        "stat"
                    )

                    if (!limitedDoObject[AIActionTypes[AIType]][energySource]) {
                        limitedDoObject[AIActionTypes[AIType]][energySource] = []
                    }
    
                    limitedDoObject[AIActionTypes[AIType]][energySource].push(
                        result
                    )
                }else{
                    limitedDoObject[AIActionTypes[AIType]].push(
                        result
                    )
                }

            }

        })

        return limitedDoObject

    }

    set(object, base, variableName, value, force = true){

        if(
            !object.AIVarsStorage[base]
        ){
            object.AIVarsStorage[base] = {}
        }

        if(
            force
            ||
            !object.AIVarsStorage[base][variableName]
        ){
            object.AIVarsStorage[base][variableName] = value
        }else{
            object.AIVarsStorage[base][variableName] += value
        }

    }

    clearTrash(object){
        for(let base in TRASH){
            for(let variableName in TRASH[base]){
                delete object.AIVarsStorage[base][variableName]
            }
            delete object.AIVarsStorage[base]
            delete TRASH[base]
        }
    }

    get(object, base, variableName, dell = true){

        if(
            !object.AIVarsStorage[base]
            ||
            !variableName
        ){
            return object.AIVarsStorage[base]
        }

        let variableValue = object.AIVarsStorage[base][variableName]

        if(dell){
            TRASH[base] = TRASH[base] || {}
            TRASH[base][variableName] = true
        }

        return variableValue

    }

    doLimited(object, AI, core) {

        let limitedDoObject = this.getLimitedDoObject(object, AI, core)

        for (let limitedDo in limitedDoObject) {

            let doArray = limitedDoObject[limitedDo]

            for (let subDoArrayIndex in doArray) {

                //hacky
                let subDoArray = Array.isArray(doArray[subDoArrayIndex]) ? doArray[subDoArrayIndex] : doArray

                if (subDoArray.length === 0) {
                    continue
                }
        
                subDoArray.sort((a, b) => b.actionStrength - a.actionStrength)

                let topXActions = subDoArray.slice(0, core.limitedActions[limitedDo])

                for (let index = 0; index < topXActions.length; index++) {

                    let highestStrengthAction = topXActions[index]

                    if (
                        highestStrengthAction.actionStrength <= core.minimalActionConfidence
                    ){break}

                    let percent = (index+1) / core.limitedActions[limitedDo]

                    if(
                        highestStrengthAction.params.activate
                        &&
                        index !== 0
                        &&
                        (
                            percent * core.conservation
                        ) > Activate.get(
                            highestStrengthAction.params.object,
                            highestStrengthAction.params.activate,
                            "object resource / object max resource"
                        )
                    ){
                        break
                    }

                    highestStrengthAction.do(
                        highestStrengthAction.params,
                        core
                    )

                }

                //hacky
                if(
                    !Array.isArray(doArray[subDoArrayIndex])
                ){
                    break
                }

            }

        }

    }

    think(object, AI){

        this.updateAIParameters(
            object,
            AI,
            CoreAIBuilder.get(object.coreType)
        )

        this.doLimited(
            object,
            AI,
            CoreAIBuilder.get(object.coreType)
        )

        this.clearTrash(object)

    }

    updateAIParameters(object, AI, core){

        AI.forEach(AIType => {

            GetParameters.get(
                AIType,
                {
                    object,
                    AIType,
                    core
                }
            )

        })

    }

}

const CoreAI = new CoreAIController()