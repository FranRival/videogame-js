
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



//https://platzi.com/cursos/javascript-practico-videojuegos/?utm_source=platzi_teacher&utm_medium=teacher_referral&utm_campaign=894 
//la ubicacion del curso. 


let canvasSize
let elementsSize
let level = 0
let lives = 3

let timeStar
let timePlayer
let timeInterval


function imprimir(){
    console.group()
    console.log(canvasSize);
    console.log(elementsSize); 
    console.groupEnd()   
}

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
    //maps. de donde salio this variable.

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
            
        /*             
        ***playerPosition y giftPosition son: 2 arrays con ubiccion X y Y que contendran estos datos:

        PosX
        PosY

                    */
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
    //como y cual es el historia?

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
    imprimir()
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



////////////10/20/25////////////

//setAtribute: width, height, id, class.
//commit - 6e7cd03b48ac7aec565ff594f33bfb51f48a1aaf
//el ciclo for. no funciona. pero si funciona dibujar una 💣 en la pocision 0,0 

//descompusimos el ciclo for anidado en el commit - 3102f9bd6bfe43980898fb6945cf791b4b304e76. 

//descomponiendo los siguiente for de los siguientes commits. 3 de junio 2024.

//primero se dibujan las columnas. de arriba hacia abajo.

//volviendo a descomponer el for. 02c75a929a2363ab528be1c46226f6eca8bbc1e7

//ARRAY BIDIMENSIONAL
//mapRoadCols [0][1] = X. Es decir, el primer indice, es toda la linea, y el siguiente indice es la pocision exacta del valor?

//ARRAY TRIDIMENSIONAL
//row - fila.
//column - columna.
//tridimensional[x][y] - esto no es un caracter. 

//FOREACH
//empieza con verticales y luego con horizontales.
//row recorre todo el array.
//rowIndex la cantidad de indices que tiene el array. VERTICAL
//col es un caracter
//colIndex la pocision del caracter. HORIZONTAL

//porque utilizar mapRowCol, en vez de map, y mapRoads/
//map = es un string. completo.
//mapRoads = conversion del string a un array de filas
//mapRowCol = separar cada fila (4 filas) en caracteres individuales crando un array de array - delete3 e170fe766e85b30d53000fb18a5e01692e28a20b

//addEventListener
//admite 3 parametros.
//tipoEvento, funcionCallback, opciones
//tecla presionada, funcion a ejecutar, boleano.
//boleano: capture, once, passive, signal - propiedades del objeto.
//mapRowCol = separar cada fila (4 filas) en caracteres individuales crando un array de array


//ACTUALIZAR LA UBICACION DE LA CALAVERA
//e72bc9b1aa0b6899faad5fea38ed2023806b7d62 - se cambia el valor de playerPosition.y. no se actualiza el nuevo lugar de la calavera. 
//CHATGPT recomienda colocar startGame(), justo debajo de las 4 funciones de movimiento. moveUp(), moveDown(), moveLeft(), moveRight().
//esto, para actualizar las nuevas ubicaciones.
//el detalle que marca: que se dejara un rastro. se ira dibujando encima.
//otro error: el juego siempre se volvera a dibujar por cada tecla. no se actualizara. o si???????
//////
//No se puede RE dibujar el mapa, con la nueva ubicacion del emoji del jugador, porque el if (col=='O') esta borrando la nueva ubicacion. vuelve a buscar la letra O en el mapa.
//48af2ff9ee61b86398f1f81099b1de4be7c07186
//hay una solucion que brinda ChatGPT...
//funciona la solucion. en el siguiente commit. el if ahora evita sobreescribir la nueva pocision en x y y. pero deja un rastro.
//siguiente commit: game.clearRect(0, 0, canvasSize, canvasSize); - funciona borrando las cordenadas. eliminando asi el rastro de la calavera.

//Delete7
//volvimos a tener solucion al problema de dibujar la calavera. En todas las funciones de movimiento. 
//intentando - clearReact
//creariamos una nueva funcion. NAAA. reenombrar la funcion starGame. pero no lo hicimos. 
//PROBLEMA: logramos hacer que se elimine el rastro que deja la calavera. pero ahora no aparece la calavera hasta que presionamos una tecla. es decir, la declaracion para que haga presencia la calavera, esta en otra funcion. 


/*
7b527a2308023d8ecabb42498c1efa851a90145d --- no desaparece la calavera.
3ad81d43322bba324cde1c8e2eae7b3e54dcdf78 --- movePlayer is not defined.
75da32b8740f2548e69af7fd929ffba18a3b4571 --- desaparece el mapa
e55e71f16beb2aaad70dd52b8e64cb2b4af05f41 --- desaparece el mapa
bea45883c9d143b2cac8ddbac2a5c6f698cf0689 --- no desaparece la calavera.
*/

//grupo de commits: busco hacer mas eficiente el codigo. menos pesado en 
// 1- Redibujar el mapa al mover.
// 2- HECHO. se utilizo mapImage. con un snapShot.

//recordando como se vuelve a dibujar el emoji del jugador.
//con clearRect arriba del forEach. borra todo. cordenadas del canvas. cordenadas del jugador. vuelve a dibujar todo. y tambien al jugador. pero esta vez + y - 1. lo que significa que se dibujar el emoji del jugador en un nuevo pixel. actualizado. 9160d99f80cc4d81ee9720a0b02fef96570f6b27

//explicado porque se dibuja el emoji del jugador sobre la puerta. 
//la puerta O, y el playerPosition tienen las mismas coordenadas.
//como se lee el if. que siginica la posicion.y + cual es el valor de la puerta O y como es que comparten valores mabos emojis. y porque el if no se ejecuta hasta...

//SPINNERTEXT
//? - splice... 
//WHILE
//como funciona el recorrido de while.
//estas lineas,...
/*
while (x !== randomI.x) {
    pathPositions.push({x, y});
    x += x < randomI.x ? 1 : -1;
}
*/
//estan incrementando en x + 1 es decir, x=0. 
//0 , 1 , 2, 3 ... valor de la x donde esta la primera coordenada del objetivo.
//esta es para la Y
/*
while (y !== randomI.y) {
    pathPositions.push({x, y});
    y += y < randomI.y ? 1 : -1;
}
*/
//y=1, y2, y3, y4...
//X4, Y3 - donde esta el objetivo.
//la funcion obtiene las coordenadas de O y I antes de que empiecen los While.
//desde mucho antes, espeficificamente en estas lineas:
//
const randomO = emptyPositions.splice(Math.floor(Math.random() * emptyPositions.length), 1)[0]; //la puerta
const randomI = emptyPositions.splice(Math.floor(Math.random() * emptyPositions.length), 1)[0]; //la salida
//
//los while usan estas coordenadas como metas.
//
//la funcion no busca evitar bombas. 
//hace el camino, luego borra las bombas impidiendo que esten en el camino, y deja libres esos espacios.
//
//FUNCION EN ACCION
//elige la O e I.
//calcula la ruta recta horizontal + vertical
//sobreescribe esa ruta y deja libres los espacios
//coloca bombas aleatorias solamente en lugares que NO esten en la ruta
//SOME
//metodo de array. devuelve true si al menos un elemento del array cumple con la condicion que se ponga en la funcion que se le pasa.
//???
//el camino matematico: 0,0 la puerta. 4,5. 00,01,02,03,04,10,11,12
//
//randomO y randomI son objetos. porque emptyPosition son objetos
//const randomO = emptyPositions.splice(Math.floor(Math.random() * emptyPositions.length), 1)[0]; - que significa esta linea en su totalidad.
//
//como se realiza el camino de O(X3,Y5) hacia I(X7,Y10)
//X y Y. 2 tipos diferentes. El scope de arriba que finalizan cuando el segundo while, y el scope de abajo, cuando se rediuja el mapa.
//Volviendo a analizar el codigo del while.

//"como se leen estas pinches lineas: const posX = elementsSize * (colI + 1) - delete11.
//"como funciona esta linea: if ((playerPosition.y - elementsSize) < elementsSize) console.log('OUT')"

//analizando el codigo... el commit 62784f017e9b02803199bba114d8b9d9b1a090c8 tiene un problema. gifPosition y playerPosition son objetos. Pero enemisPosition es un array. Y se esta rellenando el array: el problema es que cada movimiento vuelve a iniciar la function startGame. sumando y duplicando el contenido. <-2024....
//El problema:
//el forEach recorre todas las filas y columnas del mapa. el mapa es de 10 x 10. es decir, 100 veces. por cada tecla. 100 veces se esta llenando el array de EnemisPosition.
//la gravedad del rendimiento de enemisPosition depende de cuantas veces presiones cualquier tecla de movimiento


//6f2c306bf94a30b1ba70ca76653e1cc59faa3421 - forEach no crea copia. Trabaja sobre la referencia original.
//*itera. pasa uno por uno cada elemento del array. sirve para leer, mutar, empujar o llenar 
//como funciona enemyColsioner, - delete12

//hay un loop infinito. delete13. error de comparacion de array y objeto. error de levelFail ejecutandose siempre.

//delete15 : startGame se esta ejecutando muchas veces. porque no entra en undefined en playerPosition X y Y?, el secreto: porque mientras ganes, tienes valores. y por tanto no puede entrar en el if de abajo.

//6fb5ace696f34da6b653416216ed251396940570 commit donde subimos ya de nivel. delete14 y 15. 

//se creo la rama delete17. Array(lives) - para mostrar la cantidad de vidas del jugador. 

//en el commit 34630dc1ecdcee9af9aeb1bb052a33c6650e9f1d la funcion de showLives esta agregando 3+ corazones por cada tecla presionada. heartArray.forEach recorre todo el heartArray llenando la cantidad de +3 espacios. porque se ejecuta startGame, y esta llama a cada momento a showLives. 

//bases de datos. MongoDB y MySQL. aprenderlos a conectar con JS.

//creame una funcion de JS que sirva para crear archivos json dependiendo de la cantidad de datos que haya en el array de usuarios

//entendiendo como funciona JS en el Fronted, backend. + bases de datos