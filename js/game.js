
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

const giftPosition = {
    x: undefined,
    y: undefined,
}

const playerPosition = {
    x: undefined,
    y: undefined
}

let enemisPositions = [] //diferente a los corchetes.


window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)
window.addEventListener('keydown', moveByKeys)



//cada movimiento de la calavera dispara de nuevo el proceso de la funcion starGame
//el problema, es que ahora son 180. se va duplicando. actualizando.
//para solucionar, hay que limpiar el array. 
//hay que hacerlo en la function stargmae. 
function startGame(){
    console.log({canvasSize, elementsSize});
    game.font= elementsSize + 'px Verdana'
    game.textAlign = 'center'
    const map = maps[0] 
    const mapsRows = map.trim().split('\n') 
    const mapRowCols = mapsRows.map(row => row.trim().split(''))


    enemisPositions = []
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
                }
            }else if(col == 'I'){
                giftPosition.x = posX
                giftPosition.y = posY
            }else if (col=='X'){
                enemisPositions.push({
                    x: posX,
                    y: posY
                })
            }

            game.fillText(emoji, posX,posY)
        })
    });
    movePlayer()
}



function movePlayer(){
    console.log('panoquia');
    const gifCOlisionEnX = playerPosition.x.toFixed(3) == playerPosition.x.toFixed(3)
    const gifCOlisionEnY = playerPosition.y.toFixed(3) == playerPosition.y.toFixed(3)
    const gifColision = gifCOlisionEnX && gifCOlisionEnY


    //PlayerPosition es un solo objeto. con 2 valores.
    //no crece. no se multiplica. no se llena cada tecla. solo sus valores cambian (x,y) en cada movimiento

    //enemisPosition es un array. tiene muchos objetos iguales a playerPosition (X y Y), cada objeto representa una bomba en el mapa. cantidad de objetos: 10 - 100 o 1M

    //enemiyColisioner no guarda toda la lista. no es un array. solo guarda un objeto. cuando enemyColisioner compara que playerPosition tenga las mismas coordenadas que una bomba, ahi se acaba el .find, y devuelve el objeto que coincidio.  


    const enemyColisioner = enemisPositions.find(enemy =>{
        const enemyColisionX = enemy.x == playerPosition.x
        const enemyColisionY =  enemy.y == playerPosition.y
        return enemyColisionX && enemyColisionY
    })

    if (enemyColisioner) {
        console.log('Chocaste contra un enemy.');
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}



    
function moveUp(){
    console.log('Me quiero mover hacia arriba');
    if ((playerPosition.y - elementsSize) < 0) { 
        console.log('OUT');
    }else{
        playerPosition.y -= elementsSize
        startGame()
    }
}


function moveLeft(){
    if ((playerPosition.x - elementsSize) < elementsSize) {
        console.log('OUT');
    }else{
        console.log('Me quiero mover hacia izquierda');
        playerPosition.x -= elementsSize
        startGame()
    }
}
function moveRight(){
    if ((playerPosition.x + elementsSize) > canvasSize) {
        console.log('OUT');
    }else{
        console.log('Me quiero mover hacia derecha');
        playerPosition.x += elementsSize
        startGame()
    }
}
function moveDown(){
    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log('OUT');
    }else{
        console.log('Me quiero mover hacia abajo');
        playerPosition.y += elementsSize
        startGame()
    }
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


//detectando colisiones con arrays