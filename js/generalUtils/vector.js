
export class VectorController {

    triangleFactory(catetoAdjacente, catetoOposto, hipotenusa = undefined, log = false){

        if(!hipotenusa){
            hipotenusa = this.raiz(catetoAdjacente**2 + catetoOposto**2)
        }
        
        if(!catetoOposto){
            catetoOposto = this.raiz(
                hipotenusa ** 2
                -
                catetoAdjacente ** 2
            )
        }

        if(!catetoAdjacente){
            catetoAdjacente = this.raiz(
                hipotenusa ** 2
                -
                catetoOposto ** 2
            )
        }

        let seno = catetoOposto / hipotenusa
        let coseno = catetoAdjacente / hipotenusa
        let tangente = catetoOposto / catetoAdjacente

        if(log){

            console.log("cateto adjacente: " + catetoAdjacente)
            console.log("cateto oposto: " + catetoOposto)
            console.log("hipotenusa: " + hipotenusa)
            
            console.log("seno (alfa?): " + seno)
            console.log("coseno (alfa?): " + coseno)
            console.log("tangente (alfa?): " + tangente) // = seno / coseno

        }

        //console.log("INUTIL?")

        //let secante = hipotenusa / coseno

        //console.log("secante: " + secante)

        return {
            catetoAdjacente,
            catetoOposto,
            hipotenusa,
            seno,
            coseno,
            tangente
        }

    }

    raiz(value){
        return Math.sqrt(value)
    }

    toRadians(degrees){
        return ( Math.PI * degrees ) / 180
    }
    
    toDegrees(radian){
        return 180 / ( Math.PI / radian )
    }

    getTriangleSize(end, start){

        return Math.sqrt(
            ( (end.x - start.x) ** 2 )
            +
            ( (end.y - start.y) ** 2 )
        )
    
    }

    vectorNormalize(end, start){

        let size = this.getTriangleSize(end, start)
        
        return {
            "x": (end.x - start.x) / size,
            "y": (end.y - start.y) / size,
        }
    
    }

    // the name is right?
    // to use this you need to >normalizer< your inputs first
    //  1 = same direction
    // -1 = opposite direction
    //  0 = on side
    scalarProduct(p1, p2){

        return (p1.x * p2.x) + (p1.y * p2.y)
    
    }

}

//let matematica = new CustomMathController()

/*

let ini = {
    "x": 0,
    "y": 0
}

let fim = {
    "x": 20,
    "y": 0
}

console.log(
    mm.getTriangleSize(fim, ini)
)

let normalizeTri = mm.vetorNormalize(fim, ini)

console.log(
    normalizeTri
)

console.log(
    mm.getTriangleSize(normalizeTri, ini)
)

let mira = {
    "x": 10,
    "y": 0
}

let mira_norma = mm.vetorNormalize(mira, ini)

let toEnemy = mm.vetorNormalize(fim, ini)

console.log(
    mira_norma, toEnemy
)

console.log(
    mm.scalarProduct(mira_norma, toEnemy)
)

console.log(
    mm.scalarProduct(toEnemy, mira_norma)
)


//matematica.getTriangleSize()

function raiz(value){
    return Math.sqrt(value)
}


//const PI = Math.PI

let cateto_oposto = 0.5

let hipotenusa = "?"

let cateto_adj = 0.5

triangleFactory(cateto_adj, cateto_oposto)

let hip = raiz(cateto_adj**2 + cateto_oposto**2)

let seno = cateto_oposto / hip
let coseno = cateto_adj / hip
let tangent = cateto_oposto / cateto_adj

//console.log(seno)
//console.log(coseno)
//console.log(tangent)

//console.log(PI)

*/