
export class Object {

    typeOfObject = "Object"

    team = "newTeam"
    ID = "newID"

    life = 10
    maxLife = 10
    lifeRegen = 0

    defense = 0
    resistance = 1

    damage = 0

    x = 10
    y = 10

    width = 2
    height = 2

    color = "black"

    currentXVel = 0
    currentYVel = 0

    priority = 0

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

    onHitFunctions = new OnLinkedList()

    onHit(object, target){

        this.onHitFunctions.runAll(
            {
                object: object,
                target: target,
            }
        )

    }

    onDeathFunctions = new OnLinkedList()

    onDeath(object){

        this.onDeathFunctions.runAll(
            {
                object: object,
            }
        )

    }














    onHitBuildFunctionsList = []

    onHitBuild(){

        console.log("onHitBuild...")
        console.log(this)

        return true

        for (let index = 0; index < this.onHitBuildFunctionsList.length; index++) {

            this.onHitFunctions.add("func", this.onHitBuildFunctionsList[index])

        }

    }

}