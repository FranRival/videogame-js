
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
const pResult = document.querySelector('#result');
const spanRecord = document.querySelector('#record');

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
        return
    }


    if (!timeStar) {
        timeStar = Date.now()
        timeInterval = setInterval(showTime, 100)
        showRecord()
    }

    const mapsRows = map.trim().split('\n') 
    const mapRowCols = mapsRows.map(row => row.trim().split(''))
   // console.log({map, mapsRows, mapRowCols});

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

function showRecord(){
    pResult.innerHTML = localStorage.getItem('record_time')
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

function gameWin() {
    console.log('¡Terminaste el juego!');
    clearInterval(timeInterval);
    console.log('vmodofokoooo');
  
    const recordTime = +localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStar;

    if (recordTime) {
      if (recordTime >= playerTime) {
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = 'SUPERASTE EL RECORD :)';
      } else {
        pResult.innerHTML = 'no superaste el record';
      }
    } else {
      localStorage.setItem('record_time', playerTime);
      pResult.innerHTML = '--------)';
    }

    
  
    console.log({recordTime, playerTime});
  }

 

function levelWin(){
    console.log('Subiste de nivel');
    level++
    startGame()
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


function fixNumber(n){
    return Number(n.toFixed(1))
}//resolver el error de todas las variables que den decimales.


function setCanvasSize(){    
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * .7
    }else{
        canvasSize = window.innerHeight * .7
    }


    canvasSize = Number(canvasSize.toFixed(0)) 
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = canvasSize / 10

    playerPosition.x = undefined 
    playerPosition.y = undefined 
    startGame()
}




//e juego a github pages
//me aparece el error en el 3er nivel. no puedo cruzar el regalo.

//tenemos que repararlo desde el 3er nivel

//un boton de reinicio. 
//si te acabas las 3 vidas, debe de haber una animacion. 
//hay que,... 



function preg_quote(str, delimiter) {
    return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
}

function spin(text) {
    var matches = text.match(/{[^<]+/gi);
    if (matches === null) {
        return text;
    }
    if (matches[0].indexOf('{') != -1) {
        matches[0] = matches[0].substr(matches[0].indexOf('{') + 1);
    }
    if (matches[0].indexOf('}') != -1) {
        matches[0] = matches[0].substr(0, matches[0].indexOf('}'));
    }
    var parts = matches[0].split('|');
    var t = preg_quote(matches[0]);
    e_v = new RegExp('{' + t + '}', 'g');
    text = text.replace(e_v, parts[Math.floor(Math.random()*parts.length)]);
    return spin(text);
}


//los primeros commits del proyecto son los mas dificiles. son los que tienen los ciclos for. y el reemplazo de arrays por x. 


//uno de los commits. de donde traen los objetos que se imprimen en consola. - 446478d9bc2ba79af8a493a6ecd54f4ad206fcb5
//y cual es el total de lineas de codigo impresas.

//b4ae7c0143d37310cd39a8dd20b21c993930ee27 - en este commit comienzan los adeventlistener. 

//git diff -IDENTIFICADOR IDENTIFICADOR 


//el mapa se le puede colocar un console.log para saber cuando se sale del mapa. 

//hay que understand que es elementSize - playerPosition.x - playerPosition.y. ahi esta el secret de all of this modofoko shet. 