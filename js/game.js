
const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

let canvasSize
let elementsSize

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

function startGame(){


    console.log({canvasSize, elementsSize});

    game.font= elementsSize + 'px Verdana'
    game.textAlign = 'center'


    for (let i = 1; i < 11; i++) {
        game.fillText(emojis['X'], elementsSize, elementsSize * i)
    }
}


//canvas responsive 

function setCanvasSize(){
    

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * .8
    }else{
        canvasSize = window.innerHeight * .8
    }


    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    
    elementsSize = canvasSize / 10

    startGame()
}