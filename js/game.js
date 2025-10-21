
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


    //si la pantalla de alto mide 1200 x .80 = 960
    //width, height, id, class = 90
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)


    

    //960/10 = 96
    const elementsSize = canvasSize / 10
    console.log({canvasSize, elementsSize});
    //canvasSize: 960 elementSize:96

    game.font= elementsSize + 'px Verdana'
    //96px Verdana

    for (let i = 0; i < 10; i++) {
        const element = 10[i];
        game.fillText(emojis['X'], 0 * i, 0 * i)
    }


}


//tamano del canvas y sus elementos