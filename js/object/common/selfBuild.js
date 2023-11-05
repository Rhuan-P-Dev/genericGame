import { InheritController } from "../../generalUtils/inherit.js"

export class SelfBuild{

    selfBuild(){

        new InheritController().passBuildList(this, this)

        this.buildList.run(this)

    }

    passBuildList = {}

    buildList = new QueueID()

}

class Node {
    
    constructor(func, ID){
        this.func = func
        this.ID = ID
        this.next = null
    }

}

export class QueueID {

    constructor() {
        this.head = null
        this.tail = null
    }

    add(func, ID = randomUniqueID()) {

        if(this.check(ID)){return false}

        let newNode = new Node(func, ID)

        if(!this.head) {

            this.head = newNode
            this.tail = newNode

        }else{

            this.tail.next = newNode
            this.tail = newNode

        }
    }

    check(ID){

        let node = this.head

        while(node){

            if(node.ID == ID){

                return true

            }else{

                node = node.next

            }

        }

        return false

    }

    remove() {

        if(!this.head){return false}

        let tempNode = this.head

        if(this.head === this.tail) {

            this.head = null
            this.tail = null

        }else{

            this.head = this.head.next
          
        }

        return tempNode.data
        
    }

    concat(queueID, avoidDuplicate = false){

        if(avoidDuplicate){

            this.slowConcat(queueID)

        }else{

            this.fastConcat(queueID)

        }

    }

    slowConcat(queueID){

        let node = queueID.head

        while(node){

            this.add(
                node.func,
                node.ID
            )

            node = node.next

        }

    }

    fastConcat(queueID){

        if(this.tail === null){

            this.head = queueID.head
            this.tail = queueID.tail

        }else{

            if(queueID.head){
                this.tail.next = queueID.head
                this.tail = queueID.tail
            }

        }

    }

    run(object){

        let node = this.head

        while(node){

            node.func(object)

            node = node.next

            this.remove()

        }

    }

}