function onInit(func) {
    document.addEventListener("DOMContentLoaded", func)
}

function randomInteger(min = 0, max = 1){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomInterval(number){
    return randomInteger(-number, number)
}

function randomFloat(min = 0, max = 1){
    return Math.random() * (max - min) + min
}

function randomUniqueID() {
    return "ID"+randomInteger(0, 2**52)
}

function parsePositive(number){
    return Math.abs(number)
}

function alwaysPositive(number){
    if(number < 0){
        return 0
    }else{
        return number
    }
}

function returnRandomObject(objects){

    let index = randomInteger(0, Object.keys(objects).length-1)

    return Object.keys(objects)[index]

}

function firstLetterUppercase(string) {
    return string[0].toUpperCase() + string.slice(1)
}

function insertRelativeTo(arr, element, direction = "after", seach) {
    let index = arr.indexOf(seach)

    if (index === -1) {
      throw new Error(`Element ${seach} not found in the array.`)
    }

    let insertIndex = direction === "before" ? index : index + 1
    arr.splice(insertIndex, 0, element)

    return arr
}