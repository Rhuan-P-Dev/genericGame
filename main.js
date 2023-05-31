const html = document.querySelector("html")

const canvas = document.getElementById("jogo")
const ctx = canvas.getContext("2d")

const verde = {
    "color":"green",
    "x":10,
    "y":10,
    "width":10,
    "height":10,
    "bombs":1,
    "tiros":1,
}

const AI = {
    "color":"red",
    "x":200,
    "y":100,
    "width":10,
    "height":10,
    "exe":(gameObjects) => {

        if(gameObjects.AI.y == gameObjects.verde.y){
            if(gameObjects.AI.x < gameObjects.verde.x){
                gameObjects.AI.x += 10
            }else{
                gameObjects.AI.x -= 10
            }
            return
        }

        if(gameObjects.AI.x == gameObjects.verde.x){
            if(gameObjects.AI.y < gameObjects.verde.y){
                gameObjects.AI.y += 10
            }else{
                gameObjects.AI.y -= 10
            }
            return
        }

        if(gameObjects.AI.y < gameObjects.verde.y){
            gameObjects.AI.y += 10
        }else{
            gameObjects.AI.y -= 10
            
        }

        if(gameObjects.AI.x < gameObjects.verde.x){
            gameObjects.AI.x += 10
        }else{
            gameObjects.AI.x -= 10
        }

    }
}

const gameObjects = {
    "verde":verde,
    "AI":AI,
}


function bombExe(gameObjects,life){

    if(life < 1){
        delete gameObjects.initBomb
        gameObjects.verde.bombs +=1
        return
    }

    setTimeout(function(){

        if(!gameObjects.initBomb || !gameObjects.AI){return}

        if(gameObjects.initBomb.y < gameObjects.AI.y){
            gameObjects.initBomb.y += 5
        }else{
            gameObjects.initBomb.y -= 5
        }

        if(gameObjects.initBomb.x < gameObjects.AI.x){
            gameObjects.initBomb.x += 5
        }else{
            gameObjects.initBomb.x -= 5
        }

        bombExe(gameObjects,parseInt( ( life * 0.9 ) - 5 ))


    },life)


}

function tiro(gameObjects,alvo,life){

    if(life < 1){
        delete gameObjects.tiro
        gameObjects.verde.tiros += 1
        return
    }

    setTimeout(function(){

        if(gameObjects.tiro.y < alvo.y){
            gameObjects.tiro.y += 1
        }else{
            gameObjects.tiro.y -= 1
        }

        if(gameObjects.tiro.x < alvo.x){
            gameObjects.tiro.x += 1
        }else{
            gameObjects.tiro.x -= 1
        }

        tiro(gameObjects, alvo, life-5)


    },10)

}

html.addEventListener("keydown", (e)=>{


    if(e["key"] == " "){
        if(gameObjects.verde.tiros > 0){

            gameObjects.tiro = {
                "color":"green",
                "width":5,
                "height":5,
                "x":gameObjects.verde.x,
                "y":gameObjects.verde.y,
            }

            gameObjects.verde.tiros -= 1

            tiro(gameObjects,{"x":gameObjects.AI.x,"y":gameObjects.AI.y,},1000)

        }

    }

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

    if(e["key"] == "Enter"){
        if(gameObjects.verde.bombs > 0){
            gameObjects.initBomb = {
                "color":"blue",
                "width":5,
                "height":5,
                "x":gameObjects.verde.x,
                "y":gameObjects.verde.y,
            }
            gameObjects.verde.bombs -= 1

            bombExe(gameObjects,500)
        }
    }

})






function gameLoopInit(){
    setInterval(gameRender, 1)
    setInterval( () => {
        if(gameObjects.AI && gameObjects.verde){
            AI.exe(gameObjects)
        }
    }, 900)
}

function gameRender(){
    ctx.clearRect(0,0,700,700)

    destroy()

    for (y in gameObjects) {
        let x = gameObjects[y]
        ctx.fillStyle = x.color
        ctx.fillRect(x.x, x.y, x.width, x.height)
    }

}

function destroy(){

    if(gameObjects.verde && gameObjects.AI){
        if(gameObjects.verde.x == gameObjects.AI.x && gameObjects.verde.y == gameObjects.AI.y){
            delete gameObjects.verde
        }
    }

    if(gameObjects.initBomb && gameObjects.AI){
        if(gameObjects.initBomb.x == gameObjects.AI.x && gameObjects.initBomb.y == gameObjects.AI.y){
            delete gameObjects.AI
            delete gameObjects.initBomb
            gameObjects.verde.bombs +=1
        }
    }

    if(gameObjects.tiro && gameObjects.AI){
        if(gameObjects.tiro.x == gameObjects.AI.x && gameObjects.tiro.y == gameObjects.AI.y){
            delete gameObjects.AI
            delete gameObjects.tiro
            gameObjects.verde.tiros +=1
        }
    }

    
}

gameLoopInit()