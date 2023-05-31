const html = document.querySelector("html")

const canvas = document.getElementById("jogo")
const ctx = canvas.getContext("2d")

const verde = {
    "color":"green",
    "x":10,
    "y":10,
    "width":20,
    "height":20,
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

    ctx.clearRect(0,0,500,500)
    ctx.fillRect(verde.x, verde.y, verde.width, verde.height)

})

ctx.fillStyle = verde.color
ctx.fillRect(verde.x, verde.y, verde.width, verde.height)



console.log(ctx)