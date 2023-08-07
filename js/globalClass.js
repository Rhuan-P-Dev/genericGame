class Obeserver {
   
    obs = []

    add(func){

        if(typeof(func) == "function"){
            this.obs.push(func)
        }
    
    }

    remove(func){
        let index = this.obs.indexOf(func)
        if(index == -1){return false}
        this.obs.splice(index, 1);
        return true
    }

    run(data){

        for (let index = 0; index < this.obs.length; index++) {

            this.obs[index](data)

        }
    
    }
    
}

class LinkedList{

    list = {
        next:{}
    }

    add(name, value){
        let node = this.list.next
        while(1){
            if(!node.next){
                
                node[name] = value
                node.next = {}

                return true
            }else{
                node = node.next
            }
        }
    }
    
    remove(name, value){
        let node = this.list.next
        let tail = this.list
        while(1){
            if(!node.next){return false}

            if(value == node[name]){

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

    runAll(data){

        let node = this.list.next

        while(1){
            if(!node.next){return}

            node.func(data)

            node = node.next

        }

    }

    getAllInArray(name){

        let node = this.list.next

        let array = []

        while(1){
            if(!node.next){return array}

            array.push(node[name])

            node = node.next

        }

    }

}

class OnLinkedList{

    list = {
        next:{}
    }

    add(func){
        let node = this.list.next
        while(1){
            if(!node.next){
                
                node.func = func
                node.next = {}

                return true
            }else{
                node = node.next
            }
        }
    }
    
    remove(name){
        let node = this.list.next
        let tail = this.list

        while(1){
            if(!node.next){return false}

            if(name == node.func.name){

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

    runAll(data){

        let node = this.list.next

        while(1){
            if(!node.next){return}

            node.func(data)

            node = node.next

        }

    }

    getAllInArray(){

        let node = this.list.next

        let array = []

        while(1){
            if(!node.next){return array}

            array.push(node.func)

            node = node.next

        }

    }

}