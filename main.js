const html = document.querySelector("html")

const canvas = document.getElementById("jogo")
const ctx = canvas.getContext("2d")

const verde = {
    "color":"green",
    "x":10,
    "y":10,
    "width":20,
    "height":10,
}

const AI = {
    "color":"red",
    "x":200,
    "y":100,
    "width":20,
    "height":10,
    "exe":(AI,verde) => {
        if(AI.y < verde.y){
            AI.y += 10
        }else{
            AI.y -= 10

        }
        if(AI.x < verde.x){
            AI.x += 10
        }else{
            AI.x -= 10

        }
    }
}

const gameObjects = {
    "verde":verde,
    "AI":AI,
}




html.addEventListener("keydown", (e)=>{
    console.log(e)
    if(e["key"] == "ArrowUp"){
        verde.y -= 10
    }

    if(e["key"] == "ArrowDown"){
        verde.y += 10
    }

    if(e["key"] == "ArrowLeft"){
        verde.x -= 10
    }

    if(e["key"] == "ArrowRight"){
        verde.x += 10
    }

})



function gameLoopInit(){
    setInterval(gameRender, 10)
    setInterval( () => {
        AI.exe(AI,verde)
    }, 2000)
}

function gameRender(){
    ctx.clearRect(0,0,500,500)

    for (y in gameObjects) {
        let x = gameObjects[y]
        ctx.fillStyle = x.color
        ctx.fillRect(x.x, x.y, x.width, x.height)
    }

}

gameLoopInit()