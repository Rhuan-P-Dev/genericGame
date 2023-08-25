
export class ActivateInstructions{

    activates = {}

    addWeapon(weapon){

        // isso é uma ganbiara

        if(!weapon.auto){

            this.rightRotateOb.add( () => {
                weapon.rotateToRight()
            })
    
            this.leftRotateOb.add( () => {
                weapon.rotateToLeft()
            })

        }
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