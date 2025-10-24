
const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

let canvasSize
let elementsSize

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)




function startGame(){
    console.log({canvasSize, elementsSize});

    game.font= elementsSize + 'px Verdana'
    game.textAlign = 'top'

    const map = maps[0] //es un string. convertir en un array
    const mapRoads = maps[0].trim().split('\n') 
    const mapRowCols = mapRoads.map(row => row.trim().split('')) //array bidimensional: un array que sus elementos, son otro array

    //


    console.log({map, mapRoads, mapRowCols});


    for (let row = 0; row < 10; row++) {
        for (let column = 0; column < 10; column++){
            game.fillText(emojis[mapRowCols[row][column]], elementsSize * column, elementsSize * row)
            //game.fillText(mapRowCols[row][column], elementsSize * column, elementsSize * row)

            //mapRoadCols [0][1] = X. Es decir, el primer indice, es toda la linea, y el siguiente indice es la pocision exacta del valor?
            //ROW - que fila - horizontal.
            //COL - que columna - vertical

            //mapRowCols[row] - devuelve la fila. toda.
            //mapRowCols[row][column] - devuelve el caracter en la columna de la fila row.
        }
    }
}

//array 4 dimensiones
//array 5 dimensiones



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


//arrays tridimensionales
