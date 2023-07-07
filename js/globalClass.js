class obeserver {
   
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