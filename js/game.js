
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

//volviendo a JS

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
}//van a servir como almacenantes de ubicaciones.

let enemisPositions = [] 


window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)
window.addEventListener('keydown', moveByKeys)


function startGame(){
    console.log({canvasSize, elementsSize});//21.4*10=214
    game.font= elementsSize + 'px Verdana'
    game.textAlign = 'end'
    const map = maps[level] //0 - 1 - 2: dependiendo del nivel de maps.js

    ///thos modofoko if es para inicializar el game
    if (!map) {
        gameWin()
        return
    }
    if (!timeStar) {
        timeStar = Date.now()
        timeInterval = setInterval(showTime, 100)
        showRecord()
    }

    const mapsRows = map.trim().split('\n') //horizontales
    const mapRowCols = mapsRows.map(row => row.trim().split('')) //verticales
   // console.log({map, mapsRows, mapRowCols});

   //identar codigo es con Alt z

    showLives()

    enemisPositions = []
    game.clearRect(0,0,canvasSize, canvasSize);

    mapRowCols.forEach((row, rowI)=> {
        //console.log(row);//columnas
        //console.log(rowI);// contador 0 - 9
        row.forEach((col, colI)=>{  
            const emoji = emojis[col]
          //  console.log(col);//filas trasnformadas en columnas
          //  console.log(colI);//contador 0 - 9
            //console.log(emoji);//100 resultados impresos. 
            //console.log(col);//horizontales que se volvieron columnas.
            //a partir de aqui ya hay un enlazamiento entre emojis y X.
            
            const posX = elementsSize * (colI + 1) //21.4*X
            //console.log(posX); //vrticales
            const posY = elementsSize * (rowI + 1)//21.4*X
            //console.log(posY); //horizontals
          // console.log(playerPosition);//son 100 resultados.
           //son de 10 por 10.


         if (col == 'O') { //puerta
            //console.log('playerPosition s/n');                      
           // console.log(playerPosition);//sin datos.            
            if (!playerPosition.x && !playerPosition.y) {
                playerPosition.x = posX
                playerPosition.y = posY
                //console.log('playerPosition con valor');
                //console.log(playerPosition);//21.4 y 214 
                }
            }else if(col == 'I'){//regalo
                giftPosition.x = posX
                giftPosition.y = posY
               // console.log(giftPosition);//21.4 y 21.4
            }else if (col=='X'){ //bomba
                enemisPositions.push({
                    x: posX,
                    y: posY
                }) //a enemisPosition le enviamos playerPosition?
            }

            game.fillText(emoji, posX,posY)//renderiza las bombas y la calavera
           // console.log(emoji);
            //console.log(posX);
            //console.log(posY);
            
            //sigue imprimiendo la misma shiet. butt whats meands?
            
        })
    });
    movePlayer()
}

//he obtenido el resultado en pantalla. 

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
    //gifPosition y playerPosition son arrays.
       // console.log('arroja un true o false 1'); 
      //  console.log(gifCOlisionEnX); 
    const gifCOlisionEnY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3)
    //    console.log('arroja un true o false 2');
     //   console.log(gifCOlisionEnY);
    const gifColision = gifCOlisionEnX && gifCOlisionEnY;
       // console.log('arroja un true o false 3');
       // console.log(gifColision);// 'FALSE'); //arroja un false,.. hasta...

    if (gifColision) {
        //creo que cada tecla, se vuelve a iniciar el codigo.
        console.log('💥💥💥💥💥💥💥💥💥💥');
        console.log(gifColision);//arroja un true.
        levelWin()
    }


    //////aqui hay una estructura creada con Arrays. repetidora y rellenadora de caracterres. y luego, busqueda de los mismos caracteres. 
    const enemyColisioner = enemisPositions.find(enemy =>{
        //console.log('enemy collision horizontal');                
        const enemyColisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3)//false.   
        const enemyColisionY =  enemy.y.toFixed(3) == playerPosition.y.toFixed(3)//false
        return enemyColisionX && enemyColisionY
    })//enemisPositions. como inyecta this information?
    //en x y y. 


    if (enemyColisioner) {
        levelFail()
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
    
}


    
function moveUp(){
   // console.log('Me quiero mover hacia arriba');
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

//46b7a3c81742a8abda8616a6715042779eccff87 - es donde starGame() en funciones de movimiento.

//cuantas veces se repiten las funciones. 

//730c0ee6f8ccbb72bae6847eef062f50f7ec5aa9 - no detecta la colision con el regalo. y no puede acceder a la linea del regalo. se queda la calavera en terreno de bombas.

//en algun punto el mapa debe de cambiar. en que commit podria ser this shit.


//no understand como working this piece of code. 0aefcb3fbbdebfe9115b1bea240694aacf63a1cd
/* const enemyColisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3)
const enemyColisionY =  enemy.y.toFixed(3) == playerPosition.y.toFixed(3)
return enemyColisionX && enemyColisionY  */


//desde el commit 6fb5ace696f34da6b653416216ed251396940570 - hay un error. en el siguiente hay una evolucion del mapa de juego.


//6c1a3c578676e5587bd74f9020d6f1e3f8c5b5f4 - desde este commit es donde se muestra el error de chocar contra un enemigo.
//como saber e identificar cuando chocas contra una X.
/* if (enemyColisioner) {
    console.log('Chocaste contra un enemy.');
} */



//d8a3268e0bbefb7d18550415c7bf0d6ab2fcfdb0 - a partir de este commit, chocar, reinicia el juego.


/* 
levelFail (en este commit - d8a32)
gameWin (anterior commit)
levelWin (6fb5ace696f34da6b653416216ed251396940570)
 */


/* 

d8a3268e0bbefb7d18550415c7bf0d6ab2fcfdb0 - infinito. perdemos 3 vidas y continuamos en el nivel. 

4dc6b724925197d5c59c728d34da1d08f665ea98 - pasamos encima de las bombas. No podemos regresar a la linea de antes. 
 */


/* 
d8a3268e0bbefb7d18550415c7bf0d6ab2fcfdb0 - no se puede acceder al regalo en el 3er nivel. 

7d9b7cedaf6862badee2a3e94d9bcd01ea987b97 - no se puede acceder al regalo en el 3er nivel. pero, tocando una bomba, lanza un error.  
*/

//10d75ebf7c4f01cf2a99b7de83367b2124932fdb - corazones de vida.

//a5e441171713dc4ad26f7b9b238271a99a621f7e - funcion showLives funcion.

//026f17597806903a8ff7e8d2e01c17f86a917e8e - se muestran los corazones solo en consola.

//34630dc1ecdcee9af9aeb1bb052a33c6650e9f1d - sho no understand this fockin program alv.


/* 
d4292490a3d17e1f3c61a9708ac38a3bffbfecbd - hay 3 vidas. llevan comas. cuando se acaban las vidas lanza error. - invalid array lenght. 

34630dc1ecdcee9af9aeb1bb052a33c6650e9f1d - se multiplican los corazones por cada movimiento. - invalid array lenght. 
 */

//6d6a675ba974252b9f7c8c7b176ec436c57d6084 - intervalo de tiempo


//fe56136a88bf8b60b27837906d1e8b5d84e9353b - a partir de aqui ya no hay mas error de lenght array. 

//cec76fe044b633287bc885a73ff7f65717ef6604 - tenemos que dar un paso mas alla del regalo para que detecte el siguiente nivel.



/* 
76084763a04644fef346b782a33d0c69d5e73a50 - no se puede subir de nivel.
cec76fe044b633287bc885a73ff7f65717ef6604 - se tiene que dar un paso extra para pasar de nivel. 
 */

//76084763a04644fef346b782a33d0c69d5e73a50 - se imprime el tiempo en consola.


//f55dbc332007537f5f4616e91730e3d8942b0068 - WORKS. ya no es necesario una tecla extra para pasar de nivel. tampoco hay salidas de mapa. y se imprime en pantalla el Console Map. 


/* f55dbc332007537f5f4616e91730e3d8942b0068
canvasSize - ahi esta el trick. 
playerPosition.x y playerPosition.y 
*/

/* 
4c8bbe4ef9c748d2b3a1f1285c892f7476001f0a - commits anteriores, funciona muy bien.

6a549a3b36aa80bc4af5aa8fe1ed8df65c5da21b - no puedo tocar el 3er regalo en el juego. */

//2e290b2a6d920b78bcf346e88bba92b8dac91aec - en este commit se arregla. y el arreglo fue: if ((playerPosition.x - elementsSize).toFixed(2) < elementsSize)


//las 3 variables que tienen ubicaciones son:
//elementSize
//playerPosition
//giftPosition
//and todas deben conicidir alv

//quedo casi todo el codigo para ser desifrado. 