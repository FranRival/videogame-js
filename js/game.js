
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
        console.log(element);
        console.log('el valor de i ' + i);

        game.fillText(emojis['X'], 0 * i, 0 * i)

    }




    ///CHATGPT

    const mapa = maps[0].trim().split('\n');

    for (let y = 0; y < mapa.length; y++) {
    const fila = mapa[y].trim();
    for (let x = 0; x < fila.length; x++) {
        const letra = fila[x];
        //X, no guarda el indice
        const emoji = emojis[letra];
        //traduce X, I o - 💣, 🎁
        game.fillText(emoji, x*elementsSize, y*elementsSize);
    }
}



}


//tamano del canvas y sus elementos