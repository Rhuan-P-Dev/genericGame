const html = document.querySelector("html")

const canvas = document.getElementById("jogo")
const ctx = canvas.getContext("2d",{ alpha: true })

const verde = {
    "color":"green",
    "x":50,
    "y":50,
    "width":20,
    "height": 20,
    "xAcc":0,
    "yAcc":0,
    "frente":1,
    "rota":0,
    "tiros":1,
    "life":-1,
    "exe":() => {}
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

    if(e["key"] == " "){
        if(gameObjects.verde.tiros > 0){
            gameObjects.tiro = {
                "color":"black",
                "x":verde.x+(verde.width/2)-5,
                "y":verde.y+(verde.height/2)-5,
                "width":10,
                "height": 10,
                "xAcc":((-verde.rota * 2) - -verde.xAcc)*1.5,
                "yAcc":((-verde.frente * 2) - -verde.yAcc)*1.5,
                "frente":0,
                "rota":0,
                "life":150,
                "exe":() => {
                    verde.tiros += 1
                    delete gameObjects.tiro
                }
            }

            gameObjects.verde.tiros -= 1
        }

    }


})



function gameLoopInit(){
    window.requestAnimationFrame(gameRender)
    setInterval(simu,10)
}

function simu(){

    for (y in gameObjects) {
        let x = gameObjects[y]
        if(x.life < 0){
            x.exe()
        }
        x.x += x.xAcc
        x.y += x.yAcc
        if(x.life != -1){
            x.life -= 1
        }
    }

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