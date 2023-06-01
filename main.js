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
    "missi":1,
    "life":-1,
    "exe":() => {},
    "ser":() => {},
    "ar": []
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

canvas.addEventListener("click", (e)=>{

    if(gameObjects.verde.missi > 0){
        gameObjects.verde.ar[gameObjects.verde.ar.length] = {
            "color":"blue",
            "x":verde.x+(verde.width/2)-10,
            "y":verde.y+(verde.height/2)-10,
            "width":5,
            "height": 5,
            "xAcc":0,
            "yAcc":0,
            "frente":0,
            "rota":0,
            "life":100,
            "exe":(eaa) => {
                
            },
            "target":{"x":e.offsetX,"y":e.offsetY},
            "ser":(eu, alvo) => {

                if(eu.yAcc < -2){
                    eu.yAcc = -2
                }
        
                if(eu.Acc > 2){
                    eu.yAcc = 2
                }
        
                if(eu.xAcc < -2){
                    eu.xAcc = -2
                }
        
                if(eu.xAcc > 2){
                    eu.xAcc = 2
                }

                if(eu.y < alvo.y){
                    eu.yAcc += 0.05
                }else{
                    eu.yAcc -= 0.05
                }
        
                if(eu.x < alvo.x){
                    eu.xAcc += 0.05
                }else{
                    eu.xAcc -= 0.05
                }

            },
        }

        gameObjects.verde.missi += 1
        
    }

})

html.addEventListener("keydown", (e)=>{

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
                },
                "ser":() => {},
            }

            gameObjects.verde.tiros -= 1
        }

    }


})

html.addEventListener("keypress", (e)=>{

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
                },
                "ser":() => {},
            }

            gameObjects.verde.tiros -= 1
        }

    }


})

html.addEventListener("keyup", (e)=>{

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
                },
                "ser":() => {},
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

        if(y == "verde"){
            for (let index = 0; index < x.ar.length; index++) {
                x.ar[index].x += x.ar[index].xAcc
                x.ar[index].y += x.ar[index].yAcc
                x.ar[index].life -= 1
                if(x.ar[index].life < 0){
                    x.ar[index].exe(x.ar[index])
                }
                x.ar[index].ser(
                    x.ar[index],
                    x.ar[index].target
                )
            }
        }

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

        if(y == "verde"){
            for (let index = 0; index < x.ar.length; index++) {
                ctx.fillStyle = x.ar[index].color
                ctx.fillRect(x.ar[index].x, x.ar[index].y, x.ar[index].width, x.ar[index].height)
            }
        }

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