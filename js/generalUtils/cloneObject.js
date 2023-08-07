
import { TopDownBehavior } from "../AI/behavior/topDownBehavior.js"
import { EnergizadObject } from "../object/basic/energizedObject.js"
import { MovableObject } from "../object/basic/movableObject.js"
import { Object } from "../object/basic/object.js"
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

var typeActivatesFucntions = {}

onInit(function(){

    ObjectCreator = new ObjectCreatorController()

    Weapons = new WeaponsController()
    Special = new SpecialController()
    Factory = new FactoryController()
    Defense = new DefenseController()

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

    cloneAttributeFunctions = {
        "activates": this.cloneActivates,
        "onHitFunctions": this.cloneOnHitFunctions,
        "onHitBuildFunctionsList": this.cloneOnHitBuildFunctionsList,
        "rightRotateOb": this.cloneObservers,
        "leftRotateOb": this.cloneObservers,
        "AI": this.cloneAI,
        "searchPriority": this.cloneSearchPriority,
        "damageConfig": this.cloneDamageConfig,
        "onDeathFunctions": this.aaa
    }

    clone(object){

        let clonedObject = new typeOfObjectsTable[object.typeOfObject]()

        this.cloneObject(object, clonedObject)

        this.cloneAttribute(object, clonedObject)

        if(
            object.ID == "player" && object.color != "black"
        ){
            this.cloneAI(object, clonedObject)
        } // DELETE THIS!

        return clonedObject
    }

    cloneAttribute(object, clonedObject = {}){

        for (let key in object) {
            
            if(typeof(object[key]) == "object"){

                this.cloneAttributeFunctions[key](
                    object,
                    clonedObject,
                    {
                        "keyType": key
                    }, // <- useless for now
                )

            }
            
        }

        return clonedObject

    }

    cloneObject(object, clonedObject = {}){

        for (let key in object) {

            if(typeof(object[key]) == "object"){continue}

            clonedObject[key] = object[key]

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

    cloneOnHitFunctions(object, clonedObject = {}){
        
        clonedObject.onHitFunctions = new OnLinkedList()

        let onHitFunctionsArray = object.onHitFunctions.getAllInArray(name)

        for (let index = 0; index < onHitFunctionsArray.length; index++) {

            clonedObject.onHitFunctions.add(onHitFunctionsArray[index])
            
        }

        return clonedObject

    }

    aaa(object, clonedObject = {}){

        clonedObject.onDeathFunctions = new OnLinkedList()

        let onHitFunctionsArray = object.onDeathFunctions.getAllInArray(name)

        for (let index = 0; index < onHitFunctionsArray.length; index++) {

            clonedObject.onDeathFunctions.add(onHitFunctionsArray[index])
            
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

        console.log("clone hit")

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

        // useless for now

        return clonedObject

    }

    cloneSearchPriority(object, clonedObject = {}){

        clonedObject.searchPriority = {}
        clonedObject.searchPriority.ifDontHave = {}

        CloneObject.cloneObject(
            object.searchPriority,
            clonedObject.searchPriority
        )

        CloneObject.cloneObject(
            object.searchPriority.ifDontHave,
            clonedObject.searchPriority.ifDontHave
        )

        return clonedObject

    }

    cloneDamageConfig(object, clonedObject = {}){

        clonedObject.damageConfig = {}

        CloneObject.cloneObject(
            object.damageConfig,
            clonedObject.damageConfig
        )

        return clonedObject

    }

}

var CloneObject = new CloneObjectController()