const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 20
let timerId
let xDirection = 2
let yDirection = 2
let score = 0

const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

// create a block to find which block is clicked

class Block {
    constructor( xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

// make array of all blocks

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]


// draw a block

function addBlocks() {

    // create a div element
    // const block = document.createElement('div')

    // add class to the div element
    // block.classList.add('block')

    // make the block style
    // block.style.left = '100px'
    // block.style.bottom = '50px'

    // append the div element to the grid
    // grid.appendChild(block)

    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlocks()

// add user 
const user = document.createElement('div')
user.classList.add('user')
user.style.left = currentPosition[0] + 'px'
user.style.bottom = currentPosition[1] + 'px'
grid.appendChild(user)

// draw user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

// draw ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

// moves the user
function moveUser(e) {
    switch(e.key) {
        case 'f':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
            }
            break
        case 'j':
            if (currentPosition[0] < 560 - blockWidth) {
                currentPosition[0] += 10
            }
            break
    }
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

document.addEventListener('keydown', moveUser)

// add a ball
const ball = document.createElement('div')
ball.classList.add('ball')
// ball.style.left = ballCurrentPosition[0] + 'px'
// ball.style.bottom = ballCurrentPosition[1] + 'px'
drawBall()
grid.appendChild(ball)

// move the ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

// on an interval move the ball by changing speed
timerId = setInterval(moveBall, 20)

// check for collisions
function checkForCollisions() { 
    // check for block collision 
    for (let i = 0; i < blocks.length; i++) {
        if (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && 
            ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] &&
            ballCurrentPosition[1] < blocks[i].topLeft[1]))
             {
                const allBlocks = Array.from(document.querySelectorAll('.block'))
                allBlocks[i].classList.remove('block')
                // remove the block from the blocks array
                blocks.splice(i, 1)
                changeDirection()
                score++
                scoreDisplay.innerHTML = score

                // check for win
                if (blocks.length === 0) {
                    scoreDisplay.innerHTML = 'You Win'
                    clearInterval(timerId)
                    document.removeEventListener('keydown', moveUser)
                }
            }
    }



    // check for wall collision
     if ( ballCurrentPosition[0] >= (boardWidth - ballDiameter)  
        || ballCurrentPosition[1] >= (boardHeight - ballDiameter) 
        || ballCurrentPosition[0] <= 0 ) {
       
        changeDirection()
    }

    // check for user collision
    if (ballCurrentPosition[0] > currentPosition[0] && 
        ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
        ballCurrentPosition[1] > currentPosition[1] &&
        ballCurrentPosition[1] < currentPosition[1] + blockHeight
    ) {
        changeDirection()
    }

    // check for game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
           scoreDisplay.innerHTML = 'Game Over'
        document.removeEventListener('keydown', moveUser)
    }
}

function changeDirection() {
   if (xDirection === 2 && yDirection === 2) {
       yDirection = -2
       return
   }
   if (xDirection === 2 && yDirection === -2) {
       xDirection = -2
       return
   }
    if (xDirection === -2 && yDirection === -2) {
         yDirection = 2
         return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }

}

// button to start the game
document.addEventListener('keydown', moveUser)


// increase the speed of the ball as the game progresses


