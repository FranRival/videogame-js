
//canvas en js

const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

window.addEventListener('load', startGame)

function startGame(){

    let canvasSize
    canvas.setAttribute('width', canvasSize * .75)
    canvas.setAttribute('width', canvasSize * .5)

    
/*     game.fillRect(0,50,100,100)
    game.clearRect(0,0,50,50) */


/*     game.fillFont = '25px Verdana'
    game.fillStyle = 'purple'
    game.fillText('XXX', 100,100) */
}


//tamano del canvas y sus elementos