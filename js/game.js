
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
    game.font= elementsSize + 'px Verdana'
    game.textAlign = 'center'
    const map = maps[0] 
    const mapsRows = map.trim().split('\n') 
    const mapRowCols = mapsRows.map(row => row.trim().split(''))

    game.clearRect(0,0,canvasSize, canvasSize);

    //aqui se forma la cuadricula. 
    mapRowCols.forEach((row, rowI)=> {
        row.forEach((col, colI)=>{
            const emoji = emojis[col]
            const posX = elementsSize * (colI + 1)
                //mide el 10% de canvasSize. 
            const posY = elementsSize * (rowI + 1)


            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    //aqui pregunta si los valores siguen siendo undefined.
                    playerPosition.x = posX
                    playerPosition.y = posY
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

        console.log(playerPosition.x);
        console.log(playerPosition.y);
    //playerPosition.y = posicion vertical.
    if ((playerPosition.y - elementsSize) < 0) {
        //elementSize: 1 de 10 de canvasSize.
        console.log('OUT');
        //esta linea se traduce: 
        //longitud en vertical total se va reduciendo.
        //?????
        //que valor tiene .y
    }else{
        playerPosition.y -= elementsSize
        startGame()
    }
}
function moveLeft(){
    console.log('Me quiero mover hacia izquierda');
    playerPosition.x -= elementsSize
    //esta linea resta una celda a la coordenada.
    startGame()
}
function moveRight(){
    console.log('Me quiero mover hacia derecha');
    playerPosition.x += elementsSize
    //esta linea resta una celda a la coordenada.
    startGame()
}
function moveDown(){
    console.log('Me quiero mover hacia abajo');
    playerPosition.y += elementsSize
    //esta linea resta una celda a la coordenada.
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


//no salirse del map