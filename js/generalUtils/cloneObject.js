
import { TopDownBehavior } from "../AI/behavior/topDownBehavior.js"
import { EffectsController } from "../effects/effectsController.js"
import { EnergizadObject } from "../object/basic/energizedObject.js"
import { MovableObject } from "../object/basic/movableObject.js"
import { Object } from "../object/basic/object.js"
import { ComplexOnType, OnLinkedList } from "../object/basic/onInstructions.js"
import { Rotable } from "../object/basic/rotable.js"
import { RotableObject } from "../object/basic/rotableObject.js"
import { Drone } from "../object/drone.js"
import { BaseObjectFactory } from "../object/factory.js"
import { MissileProjetile } from "../object/projectiles/missileProjetile.js"
import { SmallBulletProjetile } from "../object/projectiles/smallBulletProjetile.js"
import { Ship } from "../object/ship.js"
import { Turret } from "../object/turrent.js"
import { ObjectCreatorController } from "../objectController/objectCreatorController.js"
import { DefenseController } from "../shipUnits/defense/defenseController.js"
import { FactoryController } from "../shipUnits/factory/factoryController.js"
import { SpecialController } from "../shipUnits/special/specialController.js"
import { WeaponsController } from "../shipUnits/weapons/weaponsController.js"

var ObjectCreator = ""

var Weapons = ""
var Special = ""
var Factory = ""
var Defense = ""

var Effects = ""

var typeActivatesFunctions = {}

onInit(function(){

    ObjectCreator = new ObjectCreatorController()

    Weapons = new WeaponsController()
    Special = new SpecialController()
    Factory = new FactoryController()
    Defense = new DefenseController()

    Effects = new EffectsController()

    typeActivatesFunctions = {
        "weapon": Weapons.getInfo,
        "special": Special.getInfo,
        "factory": Factory.getInfo,
        "defense": Defense.getInfo
    }

})

export class CloneObjectController {

    cloneObjectFunctions = {
        "activates": this.cloneActivates,
        "AI": this.cloneAI,
        "searchPriority": this.cloneSearchPriority,
        "damageConfig": this.cloneDamageConfig,
        "effects": this.cloneEffects,
        "owner": this.shared,
        "rightRotateOb": () => {},
        "leftRotateOb": () => {},
        "onHit": this.cloneComplexOnType,
        "onDeath": this.cloneComplexOnType,
        "onDamage": this.cloneComplexOnType,
    }

    clone(object){

        let clonedObject = new object.constructor

        this.cloneAttribute(object, clonedObject)

        this.cloneObject(object, clonedObject)

        if(
            object.ID == "player" && object.color != "black"
        ){
            this.cloneAI(object, clonedObject)
        } // DELETE THIS!

        return clonedObject
    }

    cloneSimple(object, clonedObject = {}){

        return this.cloneAttribute(object, clonedObject)

    }

    cloneObject(object, clonedObject = {}){

        for (let key in object) {

            if(typeof(object[key]) == "object"){

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

    recursiveCloneAttribute(object, clonedObject = {}, overwrite = false){

        let dummy = object

        for (let key in object) {

            if(clonedObject[key]){

                if(typeof(clonedObject[key]) == "object"){

                    this.recursiveCloneAttribute(dummy[key], clonedObject[key])
                    continue

                }

                if(overwrite){

                    clonedObject[key] = object[key]

                }

            }else{

                if(typeof(clonedObject[key]) == "object"){

                    clonedObject[key] = {}
                    this.recursiveCloneAttribute(dummy[key], clonedObject[key])

                }else{
                    
                    clonedObject[key] = object[key]

                }

            }

        }

        return clonedObject
        
    }

    cloneActivates(object, clonedObject = {}){

        for (let key in object.activates) {

            let activate = object.activates[key]

            clonedObject.addActivate(
                typeActivatesFunctions[activate.type](activate.name)
            )

        }

        return clonedObject

    }

    cloneOnFunctions(object, clonedObject = {}, config){
        
        clonedObject[config.keyType] = new OnLinkedList()

        let onFunctionsArray = object[config.keyType].getAllInArray()

        for (let index = 0; index < onFunctionsArray.length; index++) {

            clonedObject[config.keyType].add(onFunctionsArray[index])
            
        }

        return clonedObject

    }

    cloneAI(object, clonedObject = {}){

        if(object.AI){
            ObjectCreator.giveObjectAI(clonedObject, object.AI.returnAll(), true)
        }else{
            ObjectCreator.giveObjectAI(clonedObject, ["movable", "turret"], true)
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
        clonedObject.searchPriority.ifDontHave = {}

        CloneObject.cloneAttribute(
            object.searchPriority,
            clonedObject.searchPriority
        )

        CloneObject.cloneAttribute(
            object.searchPriority.ifDontHave,
            clonedObject.searchPriority.ifDontHave
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

        clonedObject.effects = {}

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
            )

        }

        return clonedObject

    }

    shared(object, clonedObject = {}, config){

        clonedObject[config.keyType] = object[config.keyType]

        return clonedObject

    }

}

var CloneObject = new CloneObjectController()