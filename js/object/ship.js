import { MovableObject } from "./movableObject.js"

export class ship extends MovableObject {

    activates = {}

    constructor(){
        super()
    }

    addActivate(activate){
        this.activates[activate.name] = activate
    }

    activate(name){
        if(this.activates[name]){
            this.activates[name].callBack(this, name)
        }
    }

}