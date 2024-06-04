
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

    const map = maps[0] //es un string. convertir en un array
    const mapRoads = maps[0].trim().split('\n') //arreglo de arreglos
    const mapRowCols = mapRoads.map(row => row.trim().split(''))
    console.log({map, mapRoads, mapRowCols});

    //crear un nuevo arreglo.


    //'modofokos and you fuck of' .splice (' ')

    for (let row = 1; row < 11; row++) {
        for (let column = 1; column < 11; column++){
            game.fillText(emojis['X'], elementsSize * column, elementsSize * row)
        }
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

//arrays multidimensionales