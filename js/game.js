
const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

/* let btnUp = document.querySelector('#up')
btnUp.addEventListener('click', moveUp)
let btnDown = document.querySelector('#down')
btnDown.addEventListener('click', moveDown)
let btnLeft = document.querySelector('#left')
btnLeft.addEventListener('click', moveLeft)
let btnRight = document.querySelector('#right')
btnRight.addEventListener('click', moveRight) */

let btnUp = document.getElementById('up')
btnUp.addEventListener('click', moveUp)
let btnDown = document.getElementById('down')
btnDown.addEventListener('click', moveDown)
let btnLeft = document.getElementById('left')
btnLeft.addEventListener('click', moveLeft)
let btnRight = document.getElementById('right')
btnRight.addEventListener('click', moveRight)


let canvasSize
let elementsSize



window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)
window.addEventListener('keydown', moveByKeys)




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
            console.log('girasoles alv');
        })
    });

}



    
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



function moveByKeys(event){
        if (event.key == "ArrowUp"){ moveUp()
        }else if (event.key == "ArrowLeft"){ moveLeft()
        }else if (event.key == "ArrowRight"){ moveRight()
        }else if (event.key == "ArrowDown"){ moveDown()}
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


