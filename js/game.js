
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

let mapImage

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
    mapImage = game.getImageData(0,0,canvasSize,canvasSize)

    movePlayer()

}

//bucle infinito.
//putImageData: se borra todo el canvas. porque existe clearRect
//eliminandola, y colocando el emoji del jugador.
//pero con cada tecla, se vuelve a dibujar encima y encima. volviendo gruesa la capa debajo. como letras negritas.
//que hace putImageData. guarda una captura de pantalla. en este caso, mapImage.
//y ese mapImage, lo ejecuta en movePlayer. mejorando la funcionalidad. 
//pero, aun asi, se seguira dibujando el canvas. 2 veces...
//NO. se dibuja una vez, en startGame, y luego utiliza la variable mapImage para guardar el snapShot. 
//luego, en movePlayer solo reutiliza el snapShot.

function movePlayer(){
    game.putImageData(mapImage,0,0)
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}
    
function moveUp(){
    console.log('Me quiero mover hacia arriba');
    playerPosition.y -= elementsSize
    movePlayer()
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


//limpieza de movimientos.