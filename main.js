const html = document.querySelector("html")

const canvas = document.getElementById("jogo")
const ctx = canvas.getContext("2d",{ alpha: true })

const verde = {
    "color":"green",
    "x":50,
    "y":0,
    "width":20,
    "height": 20,
    "xAcc":0,
    "yAcc":0,
    "frente":1,
    "rota":0,
}

var fMultP = 0.5
var fMultN = -0.5

var fProx = fMultN

var rMultP = 0.5
var rMultN = -0.5

var rProx = rMultN


const gameObjects = {
    "verde":verde,
}

html.addEventListener("keydown", (e)=>{

    console.log(e)

    if(e["key"] == "ArrowUp"){

        if(verde.yAcc < -1){
            verde.yAcc = -1
        }

        if(verde.yAcc > 1){
            verde.yAcc = 1
        }

        if(verde.xAcc < -1){
            verde.xAcc = -1
        }

        if(verde.xAcc > 1){
            verde.xAcc = 1
        }

        verde.yAcc -= (0.5 * verde.frente)
        verde.xAcc -= (0.5* verde.rota)
        
    }

    if(e["key"] == "ArrowRight"){

        verde.frente += fProx

        if(verde.frente < -1){
            console.log("AGORA É POSITIVO")
            fProx = fMultP
            verde.frente += fProx
        }

        if(verde.frente > 1){
            console.log("AGORA É NEGATIVO")
            fProx = fMultN
            verde.frente += fProx
        }

        verde.rota += rProx

        if(verde.rota < -1){
            console.log("AGORA É POSITIVO")
            rProx = rMultP
            verde.rota += rProx
        }

        if(verde.rota > 1){
            console.log("AGORA É NEGATIVO")
            rProx = rMultN
            verde.rota += rProx
        }

    }


})



function gameLoopInit(){
    window.requestAnimationFrame(gameRender)
    setInterval(simu,10)
}

function simu(){
    verde.x += verde.xAcc
    verde.y += verde.yAcc
}

function gameRender(){
    ctx.clearRect(0,0,1200,700)

    for (y in gameObjects) {
        let x = gameObjects[y]
        ctx.fillStyle = x.color
        ctx.fillRect(x.x, x.y, x.width, x.height)

        let aaa = 5

        ctx.beginPath()
        ctx.moveTo(x.x+(x.width/2), x.y+(x.height/2))
        ctx.lineTo(
            (x.x+(x.width/2)) - ( ( x.width/2 ) * x.rota ) * aaa
            , 
            (x.y+(x.height/2)) - ( ( x.height/2 ) * x.frente ) * aaa
        )

        ctx.closePath()
        ctx.stroke()

    }

    window.requestAnimationFrame(gameRender)

}

gameLoopInit()