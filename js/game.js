
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

    mapRowCols.forEach((row, rowI)=> {
        row.forEach((col, colI)=>{
            const emoji = emojis[col]
            const posX = elementsSize * (colI + 1)
            const posY = elementsSize * (rowI + 1)


            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX
                    playerPosition.y = posY
                    console.log({x:posX, y:posY});
                    
                }
            }

            game.fillText(emoji, posX,posY)
        })
    });


    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
    console.log({x:playerPosition.x, y:playerPosition.y});

}



function movePlayer(){
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
    console.log('Me quiero mover hacia izquierda');
    playerPosition.x -= elementsSize
    startGame()
}
function moveRight(){
    console.log('Me quiero mover hacia derecha');
    playerPosition.x += elementsSize
    startGame()
}
function moveDown(){
    console.log('Me quiero mover hacia abajo');
    playerPosition.y += elementsSize
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


//como funciona while.
//while recorre columnas, hasta qye sea verdadera la condicion.

//

function spinMapSafe(text) {
    const lines = text.trim().split('\n').map(line => line.trim().split(''));
    const emptyPositions = [];

    lines.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell === '-') emptyPositions.push({x, y});
        });
    });

    const randomO = emptyPositions.splice(Math.floor(Math.random() * emptyPositions.length), 1)[0];
    //de aqui nacen las X y Y. pero para la entrada. El inicio.
    //Math.floor(Math.random() * emptyPositions.length) es el indice. NO ES X.
    //pero solo es un numero. solo eso.
    //[0], en cambio, entra a los valores, X y Y.
    //en esto, solo se obtiene un numero. 1,2,3,4,5,...
    //pero [0] ordena ver que hay dentro de la caja de 1,2,3,4,5....
    const randomI = emptyPositions.splice(Math.floor(Math.random() * emptyPositions.length), 1)[0];
    //aqui, para el final.

    const pathPositions = [];
    let x = randomO.x, y = randomO.y;

    // Horizontal primero
    while (x !== randomI.x) {
        pathPositions.push({x, y});
        x += x < randomI.x ? 1 : -1;
    }
    //WHILE no recorre filas.
    //este while, recorre columnas. X.
    //no recorre todas las columnas del array. 
    // O(x=4,y=6)
    //se va a la fila 6. y comienza en X0 -> hasta empatar con I(x=4, y7)
    //

    // Vertical después
    while (y !== randomI.y) {
        pathPositions.push({x, y});
        y += y < randomI.y ? 1 : -1;
    }

    // Incluir la posición de I
    pathPositions.push({x, y});

    const newMap = lines.map((row, y) => row.map((cell, x) => {
        if (x === randomO.x && y === randomO.y) return 'O';
        if (x === randomI.x && y === randomI.y) return 'I';
        if (pathPositions.some(pos => pos.x === x && pos.y === y)) return '-';
        if (cell === 'X') return Math.random() < 0.3 ? 'X' : '-';
        return cell;
    }).join('')).join('\n');

    return newMap;
}