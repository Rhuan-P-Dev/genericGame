import { EnergizadObject } from "../object/energizedObject.js"
import { MovableObject } from "../object/movableObject.js"
import { Object } from "../object/object.js"
import { Rotable } from "../object/rotable.js"
import { RotableObject } from "../object/rotableObject.js"

import { Ship } from "../object/ship.js"

import { WeaponsController } from "../shipUnits/weapons/weaponsController.js"

var Weapons = ""

onInit(function(){

    Weapons = new WeaponsController()

})

const typeOfObjectsTable = {
    "Object": Object,
    "EnergizadObject": EnergizadObject,
    "RotableObject": RotableObject,
    "Rotable": Rotable,
    "MovableObject": MovableObject,
    "Ship": Ship,
}


export class CloneObjectController {

    clone(object){

        let clonedObject = new typeOfObjectsTable[object.typeOfObject]()
    
        for (let key in object) {
            if(typeof(object[key]) == "Object"){continue}
            clonedObject[key] = object[key]
        }
    
        for (let key in object.activates) {

            let activate = object.activates[key]

            clonedObject.activates[key] = Weapons.getWeaponInfo(activate.name)
        }
    
        return clonedObject
    }

    cloneObject(object){ //?

        let clonedObject = {}

        for (let key in object) {
            if(typeof(object[key]) == "Object"){continue}
            clonedObject[key] = object[key]
        }
    
        return clonedObject
    }

}