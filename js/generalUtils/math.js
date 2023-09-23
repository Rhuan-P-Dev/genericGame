
export class CustomMathController {

    linear(current, max){

        return current / max

    }

    linearReverse(current, max){

        return 1 - this.linear(current, max)
    
    }

    inverter(number){

        return number - (number * 2)

    }

    exponential(number, expo){
        return Math.pow(number, expo)
    }

    diminishingReturns(start, factor) {

        let result = 0
    
        if (factor > 0){
            result = start * Math.pow((1 + factor), start)
        } else{
            result = start / Math.pow((1 - factor), start)
        }
    
        return result
        
    }

}


let mm = new CustomMathController()

let seno = 0.9

let factor = 2

let maxvel = 3






let result = mm.diminishingReturns(
    seno,
    factor
)

console.log(
    //(parseInt((maxvel * seno) * 100)) / 100,(parseInt((result * maxvel) * 100)) / 100
)