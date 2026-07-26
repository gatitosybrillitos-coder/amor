const player = document.getElementById("player");
const heart = document.getElementById("heart");
const mensaje = document.getElementById("mensaje");
const carta = document.getElementById("cartaFinal");

let x = 20;
let y = 170;

let juegoTerminado = false;

const obstacles = document.querySelectorAll(".obstacle");

function colision(nx, ny){

    for(let obstacle of obstacles){

        const ox = obstacle.offsetLeft;
        const oy = obstacle.offsetTop;

        if(
            nx < ox + obstacle.offsetWidth &&
            nx + player.offsetWidth > ox &&
            ny < oy + obstacle.offsetHeight &&
            ny + player.offsetHeight > oy
        ){
            return true;
        }

    }

    return false;

}

document.addEventListener("keydown", function(e){

    if(juegoTerminado) return;

    let nx = x;
    let ny = y;

    if(e.key=="ArrowRight") nx += 15;
    if(e.key=="ArrowLeft") nx -= 15;
    if(e.key=="ArrowUp") ny -= 15;
    if(e.key=="ArrowDown") ny += 15;

    if(nx < 0) nx = 0;
    if(nx > 650) nx = 650;

    if(ny < 0) ny = 0;
    if(ny > 350) ny = 350;

    if(!colision(nx, ny)){
        x = nx;
        y = ny;
    }

    player.style.left = x + "px";
    player.style.top = y + "px";

    const playerRect = player.getBoundingClientRect();
    const heartRect = heart.getBoundingClientRect();

    if(
        playerRect.left < heartRect.right &&
        playerRect.right > heartRect.left &&
        playerRect.top < heartRect.bottom &&
        playerRect.bottom > heartRect.top
    ){

        juegoTerminado = true;

        mensaje.innerHTML = "🎉 ¡MISIÓN COMPLETADA! ❤️";

        carta.style.display = "block";

        setTimeout(() => {

            carta.scrollIntoView({
                behavior:"smooth"
            });

        },1000);

    }

});