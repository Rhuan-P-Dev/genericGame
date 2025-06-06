
class BasicLinkedList{

    list = {
        next:{}
    }

    add(value){
        let node = this.list.next
        while(1){
            if(!node.next){
                
                node.value = value
                node.next = {}

                return true
            }else{
                node = node.next
            }
        }
    }

}

class LinkedList extends BasicLinkedList{
    
    remove(value){
        let node = this.list.next
        let tail = this.list
        while(1){
            if(!node.next){return false}

            if(value == node.value){

                if(node.next.next){
                    tail.next = node.next
                }else{
                    tail.next = {}
                }

                return true
            }else{
                tail = node
                node = node.next
            }
        }
    }

    getAllInArray(){

        let node = this.list.next

        let array = []

        while(1){
            if(!node.next){return array}

            array.push(node.value)

            node = node.next

        }

    }

}

class Observer extends LinkedList {

    removeNode(node, tail){

        if(node.next.next){
            tail.next = node.next
        }else{
            tail.next = {}
        }

    }

    remove(value){
        let node = this.list.next
        let tail = this.list
        while(1){
            if(!node.next){return false}

            if(typeof(node.value) == "function"){

                if(value == node.value){
                    this.removeNode(node, tail)
                    return true
                }

            }else{

                if(value == node.value.func){
                    this.removeNode(node, tail)
                    return true
                }

            }

            tail = node
            node = node.next

        }
    }
   
    run(params, two, tree){

        let node = this.list.next

        while(1){
            if(!node.next){return}

            if(typeof(node.value) == "function"){
                node.value(params, two, tree)
            }else{
                node.value.class[node.value.func](params, two, tree)
            }

            node = node.next

        }

    }
    
}

class PriorityObserver{

    observers = []

    add(value, priority = 0){

        if(!this.observers[priority]){

            this.observers[priority] = new Observer()

        }

        this.observers[priority].add(value)

    }

    remove(value, priority){

        if(this.observers[priority]){

            this.observers[priority].remove(value)

        }

    }

    run(params){

        for (let index = 0; index < this.observers.length; index++) {

            if(this.observers[index]){
                this.observers[index].run(params)
            }
            
        }

    }

    getObserver(priority){
        return this.observers[priority]
    }

}

class referenceNode {

    constructor(name){

        this.params = {
            "reference": name,
            "offset": {
                "x": 0,
                "y": 0
            },
            "rotation": 0,
            "canvasScale": 0
        }

    }

}