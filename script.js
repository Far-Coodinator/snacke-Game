/*
1. get the ( 2d ) context
2. define the start game function by and color to the canva box
3.
*/


const gameBord = document.querySelector('#gameBord')
// 👇 usualy we should add the any variable stored by the canvas element with ( .getContext('2d') ) 
// because we will draw all the graphics by using that
const context = gameBord.getContext('2d');
const scoreValue = document.getElementById('scoreVal');

// to get gameboard width and heigth 
const Width = gameBord.width;
const Heigth = gameBord.height;
const UNIT = 10;
const BigUNIT = 20
let foodx;
let foody;
let snake =[
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
    
]
let xvel = UNIT
let yvel = 0
let score = 0
let scorePerFood = 5
let bigFoodCount = 0;
let xBigFood;
let yBigFood;
let snakeFast = 200



//  Canva 
startGame()

function startGame(){
    context.fillStyle = '#212121' ; //N01
    context.fillRect(0,0, Width, Heigth); //N02
    createFood(); // we will difend here random food combination
    fastSnakeMover()
    

}

function createFood(){
    foodx = Math.floor(Math.random() * Width / UNIT) * UNIT
    foody = Math.floor(Math.random() * Heigth / UNIT) * UNIT
}

function displayFood(){
    context.fillStyle = 'red';
    context.fillRect(foodx, foody, UNIT,UNIT);
}

function drawSnake(){
    context.fillStyle = 'aqua';
    context.strokeStyle = '#212121';
    snake.forEach(snakePart =>{
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT);
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT)
    })
}

function moveSnake(){
    const headBox = {x:snake[0].x+xvel,y:snake[0].y+yvel}
    snake.unshift(headBox)
    snake.pop()
}

function clearBoard(){
    context.fillStyle = '#212121' ; //N01
    context.fillRect(0,0, Width, Heigth); //N02
    displayFood();
}

function fastSnakeMover(){
    setTimeout(()=>{
    displayFood();
    drawSnake();
    moveSnake();
    clearBoard();
    drawSnake();
    growSnake();
    if(bigFoodCount>=3)
        displayBigFood()
    fastSnakeMover()

    },snakeFast)
    
}

const getArrow = document.querySelectorAll(".arrows .btn");
getArrow.forEach(arrow=>{
    arrow.addEventListener('click',()=>{
        const clickedArrow = arrow.getAttribute('data-active');
        changeDirection(clickedArrow)
    });
});

function changeDirection(direction){
    switch (true) {
        case (direction == 'down' && yvel != -UNIT):
            xvel = 0;
            yvel = UNIT;
            break;
        case (direction == 'up' && yvel != UNIT):
           xvel =  0;
           yvel = -UNIT;
           break;
        case(direction == 'left' && xvel != UNIT):
            xvel = -UNIT;
            yvel = 0;
            break;
        case(direction == 'right' && xvel != -UNIT):
            xvel = UNIT;
            yvel = 0;
            break;
    }
}

function growSnake(){
    if(foodx == snake[0].x && foody == snake[0].y){
        const xgrowed = snake[0].x+xvel;
        const ygrowed = snake[0].y+yvel;
        snake.unshift({x:xgrowed,y:ygrowed}) 
        score += scorePerFood
        showScore()
        createFood()
        displayFood()
        bigFoodCount += 1
        createBigFood()
    }
}

function createBigFood(){
    if(bigFoodCount >= 3){
        xBigFood = Math.floor(Math.random() * Width / UNIT) * UNIT
        yBigFood = Math.floor(Math.random() * Heigth / UNIT) * UNIT
    }
}

function displayBigFood(){
    context.fillStyle = 'red'
    context.fillRect(xBigFood,yBigFood,BigUNIT,BigUNIT)
    ateSnakeBigFood()
}

function showScore(){
    document.querySelector('#scoreVal').innerHTML = score
    increseFast()
}

function ateSnakeBigFood(){
    if((snake[0].x==xBigFood && snake[0].y==yBigFood) || (snake[0].x==xBigFood && snake[0].y==yBigFood+UNIT) || (snake[0].x==xBigFood+UNIT && snake[0].y==yBigFood) ||(snake[0].x==xBigFood+UNIT && snake[0].y==yBigFood+UNIT)){
        score += (scorePerFood*2)
        showScore()
        bigFoodCount = 0
        clearBigFood()
    }
}

function clearBigFood(){
    context.clearRect(xBigFood,yBigFood,BigUNIT,BigUNIT)
}

function increseFast(){
    switch(true){
        case(score>=30 && score<50):
            snakeFast = 180;
            break;
        case(score>=50 && score<100):
            snakeFast = 150;
            break;
        case(score>=100 && score<130):
            snakeFast = 120;
            break;
        case(score>=130 && 170):
            snakeFast = 100;
            break;
        case(score>=170 && 210):
            snakeFast = 80;
            break;
    }
    console.log(snakeFast)
}