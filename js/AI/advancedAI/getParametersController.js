import { AIUtilsController } from "../utils/AIUtils.js"
import { CoreAIController } from "./coreAIController.js"

var AIUtils
var CoreAI

onInit(function(){

    AIUtils = new AIUtilsController()
    CoreAI = new CoreAIController()

})

export class GetParametersController {

    getParametersOf = {
        "dodge": dodge,
        "directionalDefense": directionalDefense,
        "areaSupport": areaSupport,

        "movable": offensiveSearch,
        "missileV1": offensiveSearch,
        "useActivates": offensiveSearch,

        "flee": fleeSearch,

        "escortAlly": allySearch,

    }

    get(type, params){
        if(
            this.getParametersOf[type]
        ){
            this.getParametersOf[type](params)
        }else{
            return false
        }
    }
}

function dodge(params){

    let target = AIUtils.getClosestObjectOfTeams(
        params.object,
        {
            "maxDistance": PERSONAL_RANGE,
        }
    )

    if(!target){return}

    CoreAI.set(
        params.object,
        "dodge",
        "target",
        target
    )

}

function directionalDefense(params){

    let targets = AIUtils.returnArrayWithAlllObjectsOfTeams(
        params.object,
        {
            "maxDistance": CLOSE_RANGE,
        }
    )

    if(targets.length == 0){return}

    CoreAI.set(
        params.object,
        "directionalDefense",
        "targets",
        targets
    )

}

function areaSupport(params){

    let targets = AIUtils.returnArrayWithAlllObjectsOfTeams(
        params.object,
        {
            "maxDistance": MID_RANGE,
            "includeSameTeam": true,
            "includeEnemyTeam": false,
            "minPriority": params.object.searchPriority.min,
            "maxPriority": params.object.searchPriority.max,
        }
    )

    if(targets.length == 0){return}

    CoreAI.set(
        params.object,
        "areaSupport",
        "targets",
        targets
    )

}

function offensiveSearch(params){

    let target = AIUtils.getStepPriorityObjectOfTeams(params.object, ["life","energy","shield"])

    if(
        !target
        ||
        target.length === 0
    ){return}

    let distance = AIUtils.getDistanceOfObjects(params.object, target)

    CoreAI.set(
        params.object,
        "offensiveSearch",
        "target",
        target
    )

    CoreAI.set(
        params.object,
        "offensiveSearch",
        "distance",
        distance
    )

}

function fleeSearch(params){

    let target = AIUtils.getStepPriorityObjectOfTeams(params.object)

    if(
        !target
        ||
        target.length === 0
    ){return}

    let distance = AIUtils.getDistanceOfObjects(params.object, target)

    CoreAI.set(
        params.object,
        "fleeSearch",
        "target",
        target
    )

    CoreAI.set(
        params.object,
        "fleeSearch",
        "distance",
        distance
    )
}

function allySearch(params){

    let target = AIUtils.getStepPriorityObjectOfSameTeam(
        params.object,
        {
            "minPriority": params.object.priority,
            "maxPriority": params.object.searchPriority.max,
            "includeSameTeam": true,
            "includeEnemyTeam": false,
        },
        ["life","energy","shield"]
    )

    if(
        !target
        ||
        target.length === 0
    ){return}

    let distance = AIUtils.getDistanceOfObjects(params.object, target)

    CoreAI.set(
        params.object,
        "allySearch",
        "target",
        target
    )

    CoreAI.set(
        params.object,
        "allySearch",
        "distance",
        distance
    )

}