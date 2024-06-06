
const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

const btnUp = document.querySelector('#up')
const btnDown = document.querySelector('#down')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')

let canvasSize
let elementsSize

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)




function startGame(){
    console.log({canvasSize, elementsSize});

    game.font= elementsSize + 'px Verdana'
    game.textAlign = 'center'

    const map = maps[1] 
    const mapsRows = map.trim().split('\n') 
    const mapRowCols = mapsRows.map(row => row.trim().split(''))


    mapRowCols.forEach((row, rowI)=> {
        row.forEach((col, colI)=>{
            const emoji = emojis[col]
            const posX = elementsSize * (colI + 1)
            const posY = elementsSize * (rowI + 1)
            game.fillText(emoji, posX,posY)
        })
    });

/*     for (let row = 1; row < 10; row++) {
        for (let column = 1; column < 10; column++){
            game.fillText(emojis[mapRowCols[row - 1][column - 1]], elementsSize * column, elementsSize * row)
        }
    } */
}


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

//eventos y botones

btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)


function moveUp(){
    console.log('Me quiero mover hacia arriba');
}
function moveLeft(){
    console.log('Me quiero mover hacia izquierda');
}
function moveRight(){
    console.log('Me quiero mover hacia derecha');
}
function moveDown(){
    console.log('Me quiero mover hacia abajo');
}


