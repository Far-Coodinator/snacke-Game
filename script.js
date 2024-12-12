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
const UNIT = 20;
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
    const frontBox = {x:snake[0].x+xvel,y:snake[0].y+yvel}
    snake.push()
    console.log(frontBox)
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
    fastSnakeMover()
    growSnake()
    },300)
}

const getArrow = document.querySelectorAll(".arrows .btn");
getArrow.forEach(arrow=>{
    arrow.addEventListener('click',()=>{
        const clickedArrow = arrow.getAttribute('data-active');
        console.log( foodx + " " + snake[0].x + 'and'  + foody + " " + snake[0].y)
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
        createFood()
        displayFood()
    }
}
console.log( foodx + " " + snake[0].x + '  and  '  + foody + " " + snake[0].y)

