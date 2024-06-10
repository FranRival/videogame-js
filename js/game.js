
const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

const btnUp = document.getElementById('up')
btnUp.addEventListener('click', moveUp)
const btnDown = document.getElementById('down')
btnDown.addEventListener('click', moveDown)
const btnLeft = document.getElementById('left')
btnLeft.addEventListener('click', moveLeft)
const btnRight = document.getElementById('right')
btnRight.addEventListener('click', moveRight)


let canvasSize
let elementsSize

const playerPosition = {
    x: undefined,
    y: undefined
}

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)
window.addEventListener('keydown', moveByKeys)


function startGame(){
    console.log({canvasSize, elementsSize});
    game.font= elementsSize + 'px Verdana'
    game.textAlign = 'center'
    const map = maps[0] 
    const mapsRows = map.trim().split('\n') 
    const mapRowCols = mapsRows.map(row => row.trim().split(''))



    game.clearRect(0,0,canvasSize, canvasSize);
    mapRowCols.forEach((row, rowI)=> {
        row.forEach((col, colI)=>{
            const emoji = emojis[col]
            const posX = elementsSize * (colI + 1)
            const posY = elementsSize * (rowI + 1)


            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX
                    playerPosition.y = posY
                    console.log({playerPosition});
                    
                }
            }

            game.fillText(emoji, posX,posY)
        })
    });


    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)

}



function movePlayer(){
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}
    
function moveUp(){
    console.log('Me quiero mover hacia arriba');
    playerPosition.y -= elementsSize
    startGame()
}
function moveLeft(){
    console.log('Me quiero mover hacia izquierda');
    playerPosition.y -= elementsSize
    startGame()
}
function moveRight(){
    console.log('Me quiero mover hacia derecha');
    playerPosition.y -= elementsSize
    startGame()
}
function moveDown(){
    console.log('Me quiero mover hacia abajo');
    playerPosition.y -= elementsSize
    startGame()
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


//limpieza de movimientos.