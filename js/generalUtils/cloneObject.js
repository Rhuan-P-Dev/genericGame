
import { AIController } from "../AI/AIController.js"
import { EffectsController } from "../effects/effectsController.js"
import { ComplexOnType } from "../object/instructions/onInstructions.js"
import { Rotable } from "../object/basic/rotable.js"
import { ActivateInfoController } from "../shipUnits/forAllShipUnits/activateInfoController.js"

var Effects = ""
var AIC = ""
var ActivateInfo = ""

onInit(function(){

    Effects = new EffectsController()
    AIC = new AIController()
    ActivateInfo = new ActivateInfoController()

})

export class CloneObjectController {

    cloneObjectFunctions = {
        "activates": this.cloneActivates,
        "AI": this.cloneAI,
        "searchPriority": this.cloneSearchPriority,
        "damageConfig": this.cloneDamageConfig,
        "effects": this.cloneEffects,
        "owner": this.shared,
        "rightRotateObserver": () => {},
        "leftRotateObserver": () => {},
        "modifierStatusObserver": () => {},
        "rotateObserver": () => {},
        "setAngleObserver": () => {},
        "onHit": this.cloneComplexOnType,
        "onDeath": this.cloneComplexOnType,
        "onDamage": this.cloneComplexOnType,
        "onKill": this.cloneComplexOnType,
        "buildList": () => {},
        "passBuildList": () => {},
        "animations": () => {},

        "life": this.cloneStatsObserver,
        "switchStatsVariables": () => {},
        "damageTypes": this.insideRecursive,
        "defenseTypes": this.insideRecursive,
        "damageOrder": this.insideRecursive,
        "disableResuls": this.shared, //will bug?
        "disableRotationResul": this.shared, //will bug?
        "disableAdvanceResul": this.shared, //will bug?
        "addWeaponObserver": () => {},
        "addActivateObserver": () => {},
        "lastAttacker": () => {},
        "AIVarsStorage": () => {},
        "coreType": () => {},
        "markedEnemys": () => {},
        "damageOrderList": () => {},
        "deathTransitions": () => {},
        "preLaserObserver": () => {},
        "posLaserObserver": () => {},
        "halfingStats": () => {},
        "addActivatesPromises": () => {},
    }

    clone(object){

        let clonedObject = new object.constructor(true)

        this.cloneAttribute(object, clonedObject)

        this.cloneObject(object, clonedObject)

        return clonedObject
    }

    cloneSimple(object, clonedObject = {}){

        return this.cloneAttribute(object, clonedObject)

    }

    cloneObject(object, clonedObject = {}){

        for (let key in object) {

            if(typeof(object[key]) == "object"){

                if(
                    !this.cloneObjectFunctions[key]
                ){
                    console.warn(key)
                }

                this.cloneObjectFunctions[key](
                    object,
                    clonedObject,
                    {
                        "keyType": key
                    },
                )

            }
            
        }

        return clonedObject

    }

    cloneAttribute(object, clonedObject = {}){

        for (let key in object) {

            if(
                typeof(object[key]) == "object"
                ||
                typeof(object[key]) == "function"
            ){
                continue
            }

            clonedObject[key] = object[key]

        }

        return clonedObject
    }

    recursiveCloneAttribute(object, clonedObject = new object.constructor, overwrite = false){

        let dummy = object

        for (let key in object) {

            if(clonedObject[key] !== undefined){

                if(typeof(clonedObject[key]) == "object"){

                    this.recursiveCloneAttribute(dummy[key], clonedObject[key], overwrite)
                    continue

                }

                if(overwrite){

                    clonedObject[key] = object[key]

                }

            }else{

                if(object[key] == undefined){
                    clonedObject[key] = object[key]
                    continue
                }

                if(
                    typeof(object[key]) == "object"
                    &&
                    object[key].constructor.name == "Array"
                    ||
                    object[key].constructor.name == "Object"
                ){

                    clonedObject[key] = new object[key].constructor

                    this.recursiveCloneAttribute(dummy[key], clonedObject[key], overwrite)

                }else{
                    
                    clonedObject[key] = object[key]

                }

            }

        }

        return clonedObject
        
    }

    cloneActivates(object, clonedObject = {}){

        // Some special ships have default activates.
        // To avoid duplications, we will erase these default activates.
        clonedObject.addActivatesPromises = []

        for (let key in object.activates) {
            let activate = object.activates[key]
            clonedObject.addActivate(
                ActivateInfo.build(activate.type, activate.name)
            )
        }

        return clonedObject

    }

    cloneAI(object, clonedObject = {}){

        if(object.AI.returnAll){
            AIC.giveAI(clonedObject, object.AI.returnAll(), true)
        }else{
            AIC.giveCoreAI(clonedObject, object.AI, object.coreType, true)
        }

        return clonedObject

    }

    cloneComplexOnType(object, clonedObject = {}, config){

        clonedObject[config.keyType] = new ComplexOnType()

        let complexOnTypeFunctions = object[config.keyType].getAll()

        for (let stage in complexOnTypeFunctions) {

            let allInstructions = complexOnTypeFunctions[stage].getAll()

            for(let priority in allInstructions){

                let instructionConfig = allInstructions[priority]

                clonedObject[config.keyType].add(
                    instructionConfig,
                    stage,
                    priority
                )

            }

        }

        return clonedObject

    }

    cloneSearchPriority(object, clonedObject = {}){

        clonedObject.searchPriority = {}

        CloneObject.recursiveCloneAttribute(
            object.searchPriority,
            clonedObject.searchPriority
        )

        return clonedObject

    }

    cloneDamageConfig(object, clonedObject = {}){

        clonedObject.damageConfig = {}

        CloneObject.cloneAttribute(
            object.damageConfig,
            clonedObject.damageConfig
        )

        return clonedObject

    }

    cloneEffects(object, clonedObject = {}, config){

        Effects.removeAll(clonedObject)

        let effectsArray = object.effects

        for (let effect in effectsArray){

            let effectParams = CloneObject.cloneAttribute(
                effectsArray[effect]
            )

            effectParams.config = CloneObject.cloneAttribute(
                effectsArray[effect].config
            )

            effectParams.params = CloneObject.cloneAttribute(
                effectsArray[effect].params
            )

            effectParams.params.object = clonedObject

            Effects.add(
                effectParams.effectName,
                effectParams.effectType,
                effectParams.params,
                effectParams.config,
                effectParams.promise
            )

        }

        return clonedObject

    }

    shared(object, clonedObject = {}, config){

        clonedObject[config.keyType] = object[config.keyType]

        return clonedObject

    }

    cloneEngineList = [
        "xMult",
        "yMult",
        "cosine",
        "sine",
        "resetVel",
        "rotationVel",
        "currentRotationVel",
        "rotationMult",
    ]

    cloneEngine(object){

        let newObject = new Rotable(true)

        for (let index = 0; index < this.cloneEngineList.length; index++) {
            
            let status = this.cloneEngineList[index]

            if(typeof(object[status]) != "undefined"){

                newObject[status] = object[status]

            }else{

                return false
            }
            
        }

        return newObject

    }

    cloneStatsObserver(object, clonedObject = {}, config){

        clonedObject[config.keyType].set(object[config.keyType].get())

    }

    insideRecursive(object, clonedObject = {}, config){

        clonedObject[config.keyType] = CloneObject.recursiveCloneAttribute(
            object[config.keyType],
            clonedObject[config.keyType]
        )

    }

}

var CloneObject = new CloneObjectController()