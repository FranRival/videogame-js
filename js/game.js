
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
        //10[1] = undefined.
        const element = 10[i];
        console.log(element);
        console.log(i);


        //aqui se dibuja 💣 en la pocision 0, 0
        game.fillText(emojis['X'], 0 * i, 0 * i)

    }




    ///CHATGPT

    const mapa = maps[0].trim().split('\n');
    //transformado en array. 9 bloques.

    for (let y = 0; y < mapa.length; y++) {
        //y = 1, 2, 3, 4...9

        //este for modifica fila en cada iteracion


        //mutable. 
        //fila = mapa[0],[1],[2]...[9]
    const fila = mapa[y];
    //mapa[1, 2, 3, 4...9]
    for (let x = 0; x < fila.length; x++) {

        //este for usa fila para acceder a sus caracteres

        const letra = fila[x];       
        //fila['I', 'X', '-', 'O']
        const emoji = emojis[letra]; // convierte letra a emoji
        game.fillText(emoji, x*elementsSize, y*elementsSize);
    }
}



}


//tamano del canvas y sus elementos