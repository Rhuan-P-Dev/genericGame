
export class Object {

    typeOfObject = "Object"

    team = "newTeam"
    ID = "newID"

    life = 200
    maxLife = 200
    lifeRegen = 0

    defense = 2
    resistance = 0.95

    damage = 15

    x = 10
    y = 10

    width = 5
    height = 5

    color = "black"

    currentXVel = 0
    currentYVel = 0

    prioritys = {
        priority: 0,
        targetPriority: undefined,
        above: undefined,
        nothing: undefined,
    }

    activates = {}

    addWeapon(weapon){

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

        if(activate.typeOfObject == "weapon"){
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