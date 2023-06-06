function onInit(func) {
    document.addEventListener("DOMContentLoaded", func)
}

function randomInteger(min = 0, max = 1){
    return parseInt( (Math.random() * (max + 1) ) + min )
}

function randomUniqueID() {
    return "ID"+randomInteger(0, 2**52)
}

function checkPositive(number){
    if(number >= 0){
        return true
    }else{
        return false
    }
}

function parsePositive(number){
    if(!checkPositive(number)){
        return number - number*2
    }else{
        return number
    }
}