
import { VectorController } from "../../generalUtils/vector.js"

var Vector = ""

onInit(function(){

    Vector = new VectorController()

})

export class ActivateInstructions{

    activates = {}

    addWeapon(weapon){

        setWeaponAngle(this, weapon)

        this.setAngleObserver.add( () => {

            setWeaponAngle(this, weapon)
            
        })

        this.rightRotateObserver.add( (vel) => {
            weapon.rotateToRight(vel)
        })
    
        this.leftRotateObserver.add( (vel) => {
            weapon.rotateToLeft(vel)
        })

    }

    addActivate(activate){

        activate.owner = this
        activate.team = this.team

        if(activate.type == "weapon"){
            this.addWeapon(activate)
        }

        this.activates[activate.ID] = activate
        
    }

    activate(ID){
        if(this.activates[ID]){
            this.activates[ID].callBack(this, ID)
        }
    }

    getActivates(){
        return this.activates
    }

    disableResuls = {}

    disableActivate() {
        for (let ID in this.activates) {
            this.disableResuls[ID] = this.activates[ID]
            delete this.activates[ID]
        }
    }

    enableActivate() {
        for (let ID in this.disableResuls) {
            this.activates[ID] = this.disableResuls[ID]
            delete this.disableResuls[ID]
        }
    }

}

function setWeaponAngle(object, weapon){

    weapon.setAngle(
        object.getAngle() + -Vector.toRadians(weapon.buildAngle)
    )

}