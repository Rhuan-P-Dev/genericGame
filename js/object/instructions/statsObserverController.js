
export class StatsObserverController {

    constructor(object, stat, value){

        this.object = object

        this[stat] = value

        this.stat = stat

    }

    observer = new Observer()

    get(){
        return this[this.stat]
    }

    set(value){

        let oldStatValue = this.get()

        this[this.stat] = value

        this.run(oldStatValue, this.get())

    }

    math(operation, value){

        let oldStatValue = this.get()

        switch(operation) {
            case "+":
                this[this.stat] += value
                break
            case "-":
                this[this.stat] -= value
                break
            case "*":
                this[this.stat] *= value
                break
            case "/":
                if(value !== 0) {
                    this[this.stat] /= value
                } else {
                    console.error("Division by zero is not allowed.")
                }
                break
            default:
                console.error("Invalid operation. Please use +, -, *, or /")
        }

        this.run(oldStatValue, this.get())

    }

    run(oldStatValue, currentStatValue){

        let params = {
            oldStatValue: oldStatValue,
            currentStatValue: currentStatValue,
            stat: this.stat,
            object: this.object
        }

        this.observer.run(params)

    }

}