class LinkedList{

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

            array.push(node)

            node = node.next

        }

    }

}

class Obeserver extends LinkedList {

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
   
    run(params){

        let node = this.list.next

        while(1){
            if(!node.next){return}

            if(typeof(node.value) == "function"){
                node.value(params)
            }else{
                node.value.class[node.value.func](params)
            }

            node = node.next

        }

    }
    
}