
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


let canvasSize
let elementsSize
let level = 0
let lives = 3

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


    if (!map) {
        gameWin()
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
    const heartArray = Array(lives).fill(emojis['HEART'])//crear un array. no sabemos que tipo de elemento. string. o numero. o true. o false.
    console.log(heartArray);


   // spanLives.innerHTML = '' //yo sha no fucking undestand
    heartArray.forEach(heart => spanLives.append(heart))
}

function levelFail(){
    lives --

    if (lives > 0) {
        console.log('Fallaste alv');//otro commit basura y vacio
        playerPosition.x = undefined
        playerPosition.y = undefined
        startGame()
    }else {
        level = 0
        playerPosition.x = undefined
        playerPosition.y = undefined
        startGame()
    }
}

function gameWin(){
    console.log('Terminaste el juego');
    return
}


function movePlayer(){
    const gifCOlisionEnX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3)
    const gifCOlisionEnY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3)
    const gifColision = gifCOlisionEnX && gifCOlisionEnY;

    if (gifColision) {
        levelWin()
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
    level++
    startGame()
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


//sistema de vidas y corazones.

