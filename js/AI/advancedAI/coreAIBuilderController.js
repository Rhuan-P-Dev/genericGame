
import { CloneObjectController } from "../../generalUtils/cloneObject.js"

var CloneObject

onInit(function(){

    CloneObject = new CloneObjectController()

})

const CACHE = {}

export class CoreAIBuilderController {

    inheritance = {
        "test": "default",
        "support": "default",
    }

    // 1 = neutral

    default = {
        "offensive": 1.25,
        "defensive": 1,
        "support": 0.75,

        //how much does it like to get close to things
        "approximation": 1,

        "long buff": 1.2,
        "mid buff": 1.1,
        "short buff": 1.05,

        //how much force will it have to wait.
        //example: if the activator is on cooldown or doesn't have 'energy'
        "patience": 0.75,

        //how much care should be given to the shields
        "shieldPriority": 0.8,

        //define the number of times a type of action can be executed per frame.
        "limitedActions": {
            "movable": 1,
            "activate": 6
        },

        //how much you conserve your 'energy'
        "conservation": 1.25,

        //minimum value for an action to be considered
        "minimalActionConfidence": 0.5
    }

    support = {
        "offensive": 0.9,
        "defensive": 1,
        "support": 1.25,

        "approximation": 1.25,

        "long buff": 1,
        "mid buff": 0.9,
        "short buff": 0.8,
    }

    factory = {
        "conservation": 0,
        "minimalActionConfidence": 0,
        "limitedActions": {
            "activate": 999
        },
    }

    restart(){

        for(const key in CACHE){
            delete CACHE[key]
        }

    }

    build(coreName = "undefined"){

        if(CACHE[coreName]){
            return true
        }

        if(!this[coreName]){

            throw new Error(`Core: ${coreName} - not found`)

        }

        let newCore = this[coreName]

        let tempCoreName = this.inheritance[coreName]

        while(tempCoreName){

            newCore = CloneObject.recursiveCloneAttribute(
                this[tempCoreName],
                newCore
            )

            tempCoreName = this.inheritance[tempCoreName]

        }

        CACHE[coreName] = newCore

    }

    get(coreName){
        return CACHE[coreName]
    }

    randomAI(percentage, parent = "default") {
        if (!this[parent]) {
            throw new Error(`Parent core: ${parent} - not found`)
        }
        let modifiedCore = { ...this[parent] }
        for (let key in modifiedCore) {
            if (
                key !== "limitedActions"
                &&
                typeof modifiedCore[key] === "number"
            ) {
                modifiedCore[key] *= randomInterval(percentage) + 1
            }
        }

        let name = `${randomUniqueID()}-randomAI_${percentage}`

        this.addAI(modifiedCore, name, parent)

        return name
    }
}