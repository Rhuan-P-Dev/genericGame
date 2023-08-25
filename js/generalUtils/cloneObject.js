
import { TopDownBehavior } from "../AI/behavior/topDownBehavior.js"
import { EffectsController } from "../effects/effectsController.js"
import { EnergizadObject } from "../object/basic/energizedObject.js"
import { MovableObject } from "../object/basic/movableObject.js"
import { Object } from "../object/basic/object.js"
import { OnLinkedList } from "../object/basic/onInstructions.js"
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

var typeActivatesFucntions = {}

console.log("EU ESPERO QUE ESSA ALT NÃO TENHA QUEBADO NADA! LINHA 141!")

onInit(function(){

    ObjectCreator = new ObjectCreatorController()

    Weapons = new WeaponsController()
    Special = new SpecialController()
    Factory = new FactoryController()
    Defense = new DefenseController()

    Effects = new EffectsController()

    typeActivatesFucntions = {
        "weapon": Weapons.getInfo,
        "special": Special.getInfo,
        "factory": Factory.getInfo,
        "defense": Defense.getInfo
    }

})

const typeOfObjectsTable = {
    "Object": Object,
    "EnergizadObject": EnergizadObject,
    "RotableObject": RotableObject,
    "Rotable": Rotable,
    "MovableObject": MovableObject,
    "Ship": Ship,
    "MissileProjetile": MissileProjetile,
    "SmallBulletProjetile": SmallBulletProjetile,
    "Turret": Turret,
    "Drone": Drone,
    "BaseObjectFactory": BaseObjectFactory,
}

export class CloneObjectController {

    cloneObjectFunctions = {
        "onHitBuildFunctionsList": this.cloneOnHitBuildFunctionsList, //useless?
        "activates": this.cloneActivates,
        "AI": this.cloneAI,
        "searchPriority": this.cloneSearchPriority,
        "damageConfig": this.cloneDamageConfig,
        "effects": this.cloneEffects,
        //"onHit": this.cloneOnFunctions,
        //"onDeath": this.cloneOnFunctions,
        //"onDamage": this.cloneOnFunctions,
        "owner": this.shared,
        //"onHitOb": this.cloneObservers,
        //"onDeathOb": this.cloneObservers,
        //"onDamageOb": this.cloneObservers,
        "rightRotateOb": () => {}, //this.cloneObservers,
        "leftRotateOb": () => {}, //this.cloneObservers,
        "onHit": this.cloneObservers,
        "onDeath": this.cloneObservers,
        "onDamage": this.cloneObservers,
    }

    clone(object){

        let clonedObject = new typeOfObjectsTable[object.typeOfObject]()

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

            /*

            if(
                !overwrite
                &&
                clonedObject[key]
                &&
                typeof(clonedObject[key]) == "object"
            ){
                this.recursiveCloneAttribute(dummy[key], clonedObject[key])
                continue
            }

            if(
                typeof(object[key]) == "object"
                &&
                !clonedObject[key]
            ){
                clonedObject[key] = {}
                this.recursiveCloneAttribute(dummy[key], clonedObject[key])
                continue
            }
            
            if(
                overwrite
                ||
                !clonedObject[key]
            ){
                clonedObject[key] = object[key]
            }

            */

        }

        return clonedObject
        
    }

    cloneActivates(object, clonedObject = {}){

        for (let key in object.activates) {

            let activate = object.activates[key]

            clonedObject.addActivate(
                typeActivatesFucntions[activate.type](activate.name)
            )

        }

        return clonedObject

    }

    cloneOnFunctions(object, clonedObject = {}, config){
        
        clonedObject[config.keyType] = new OnLinkedList()

        let onFunctionsArray = object[config.keyType].getAllInArray()

        for (let index = 0; index < onFunctionsArray.length; index++) {

            clonedObject[config.keyType].add(onFunctionsArray[index].value)
            
        }

        return clonedObject

    }

    cloneAI(object, clonedObject = {}){

        if(object.AI){
            ObjectCreator.giveObjectAI(clonedObject, object.AI.returnAll(), true)
        }else{
            ObjectCreator.giveObjectAI(clonedObject, ["movable", "turret"], true)
            //clonedObject.searchPriority = new TopDownBehavior().searchPriority
        }

        return clonedObject

    }

    cloneOnHitBuildFunctionsList(object, clonedObject = {}){

        //console.log("clone hit")

        return // useless?

        clonedObject.onHitBuildFunctionsList = new Array()

        for (let index = 0; index < object.onHitBuildFunctionsList.length; index++) {

            clonedObject.onHitBuildFunctionsList.push(
                object.onHitBuildFunctionsList[index]
            )
            
        }

        return clonedObject

    }

    cloneObservers(object, clonedObject = {}, config){

        clonedObject[config.keyType] = new Obeserver()

        let obFucntions = object[config.keyType].getAllInArray()

        for (let index in obFucntions) {

            let value = obFucntions[index].value

            if(typeof(value) == "function"){

                clonedObject[config.keyType].add(value)

            }else{

                clonedObject[config.keyType].add({
                    "func": value.func,
                    "class": value.class
                })
                
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

        clonedObject.effects = {} // new LinkedList()

        let effectsArray = object.effects //.getAllInArray("effect")

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

    cloneArray(object, clonedObject = {}, config){

        console.log("USELESS FUCKTION!!")

        clonedObject[config.keyType] = new Array()

        return clonedObject

    }

    cloneLinkedList(object, clonedObject = {}, config){

        console.log("USELESS FUCKTION!!")

        clonedObject[config.keyType] = new LinkedList()

        return clonedObject

    }

    shared(object, clonedObject = {}, config){

        clonedObject[config.keyType] = object[config.keyType]

        return clonedObject

    }

}

var CloneObject = new CloneObjectController()