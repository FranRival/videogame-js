
//canvas en js

const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

window.addEventListener('load', startGame)

function startGame(){

    let canvasSize

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * .8
    }else{
        canvasSize = window.innerHeight * .8
    }


    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    

    const elementsSize = canvasSize / 10
    console.log({canvasSize, elementsSize});

    game.font= elementsSize + 'px Verdana'

    for (let i = 0; i < 10; i++) {
        const element = 10[i];
        game.fillText(emojis['X'], 0 * i, 0 * i)
    }


}


//tamano del canvas y sus elementos