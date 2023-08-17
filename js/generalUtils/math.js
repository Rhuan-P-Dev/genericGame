
export class MathController {

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

}