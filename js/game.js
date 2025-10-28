
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


    mapRowCols.forEach((row, rowI)=> {
        row.forEach((col, colI)=>{
            const emoji = emojis[col]
            const posX = elementsSize * (colI + 1)
            const posY = elementsSize * (rowI + 1)




            if (playerPosition.x === undefined && col === 'O') {
                playerPosition.x = posX
                playerPosition.y = posY
                console.log({playerPosition});
            }

            //PROBLEMA: no se dibuja el emoji del jugador.
            //hasta que se presiona una tecla. entonces aparece
            //porque      game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y), no esta aqui. esta en la siguiente funcion.

            //RESUELTO.
                        game.fillText(emoji, posX,posY)

        })
    });
         game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)

}




//PROBLEMA: este codigo deja un rastro.
//se supone que con clearReact deberia de nunca moverse. porque estaria reescribiendo la ubicacion una y otra vez.
//pero deja un rastro.

//la razon: en cada funcion de movimiento se vuelve a ejecutar movePlayer.

//43639bdee388992eb01499cafb33935ebdee1d13

//resuelto sin crear una nueva funcion de renderMaps como lo decia ChatGPT. 




function movePlayer(){
    game.clearRect(0, 0, canvasSize, canvasSize)
    startGame()

}
    
function moveUp(){
    console.log('Me quiero mover hacia arriba');
    playerPosition.y -= elementsSize
    movePlayer()
}
function moveLeft(){
    console.log('Me quiero mover hacia izquierda');
    playerPosition.x -= elementsSize
    movePlayer()
}
function moveRight(){
    console.log('Me quiero mover hacia derecha');
    playerPosition.x += elementsSize
    movePlayer()
}
function moveDown(){
    console.log('Me quiero mover hacia abajo');
    playerPosition.y += elementsSize
    movePlayer()
}

//colisiona con las bombas? o no.
//


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


//player position