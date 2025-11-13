
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

const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#tiempo')


let canvasSize
let elementsSize
let level = 0
let lives = 3

let timeStar
let timePlayer
let timeInterval

const giftPosition = {
    x: undefined,
    y: undefined,
}

const playerPosition = {
    x: undefined,
    y: undefined
}

let enemisPositions = [] 


window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)
window.addEventListener('keydown', moveByKeys)


function startGame(){
    console.log({canvasSize, elementsSize});
    game.font= elementsSize + 'px Verdana'
    game.textAlign = 'end'
    const map = maps[level] 



    ///thos modofoko if es para inicializar el game
    if (!map) {
        gameWin()//sospecho que aqui hay otro error.
    }


    if (!timeStar) {
        timeStar = Date.now()
        timeInterval = setInterval(showTime, 100)
    }

    const mapsRows = map.trim().split('\n') 
    const mapRowCols = mapsRows.map(row => row.trim().split(''))

    showLives()

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


function showLives(){
    const heartArray = Array(lives).fill(emojis['HEART'])

    spanLives.innerHTML = ''
    heartArray.forEach(heart => spanLives.append(heart))
}

function showTime(){
    spanTime.innerHTML = Date.now() - timeStar
}

function levelFail(){
    console.log('Chocaste con un nivel');
    lives --

    if (lives <= 0) {
        level = 0
        lives = 3
        timeStar = undefined   
    }

    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

function gameWin(){
    console.log('Terminaste el juego');
    clearInterval(timeInterval)
}



///ERROR EN ESTE COMMIT.
//cuando se colisiona contra el regalo, no se avanza de nivel. 
//hay que reiniciar las coordenadas de playerPosition en X y Y.

function movePlayer(){
    const gifCOlisionEnX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3)
    const gifCOlisionEnY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3)
    const gifColision = gifCOlisionEnX && gifCOlisionEnY;

    if (gifColision) {
        level++
        playerPosition.x = undefined
        playerPosition.y = undefined
        startGame()
    }


    const enemyColisioner = enemisPositions.find(enemy =>{
        const enemyColisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3)
        const enemyColisionY =  enemy.y.toFixed(3) == playerPosition.y.toFixed(3)
        return enemyColisionX && enemyColisionY
    })

    if (enemyColisioner) {
        levelFail()
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}



function levelWin(){
    console.log('Subiste de nivel');
    clearInterval(timeInterval)


    const recordTime = localStorage.getItem('record_time')
    console.log({recordTime});
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




//localstorage: almacenamiento local. 
//para tener un historial de winnning. busquemos si en local storage haya una variable de record. 
//para saber si existe un record. sino, ser el winning.