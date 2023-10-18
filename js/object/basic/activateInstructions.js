
import { VectorController } from "../../generalUtils/vector.js"

var Vector = ""

onInit(function(){

    Vector = new VectorController()

})

export class ActivateInstructions{

    activates = {}

    addWeapon(weapon){

        weapon.setAngle(
            this.getAngle() + -Vector.toRadians(weapon.buildAngle)
        )
        
        this.rightRotateOb.add( () => {
            weapon.rotateToRight(this.angle)
        })
    
        this.leftRotateOb.add( () => {
            weapon.rotateToLeft(this.angle)
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

}