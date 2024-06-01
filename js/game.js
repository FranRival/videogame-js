
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
}


//tamano del canvas y sus elementos