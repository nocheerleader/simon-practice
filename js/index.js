//SETTING THE VARIABLES 
let order = []; //keep track of order of game lights 
let playerOrder = []; //order in which the player presses the lights 
let flash; //number of light flashes in game 
let turn; //to keep track of what turn a player is on 
let good; //boolean - has the player hit the correct color? 
let compTurn; //boolean - is it the players turn or the computers turn? 
let intervalId;
let strict = false; //has the strict button been pressed, false starts it unchecked
let noise = true; 
let on = false; //sets power button to off at start of game/before gameplay 
let win; //has the player won the game?

//TO SELECT THE HTML ELEMENTS and INITIALIZE AS VARIABLES
//THESE ARE ALL ELEMENTS THAT THE PLAYER CAN INTERACT WITH 
//The document method querySelector() returns the first Element within the document that matches the specified selector which we pass in 
const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft"); 
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

/* CW TO USE THE CONSOLE LOG METHODS IN TUTORIAL VIDEO FOR DOCUMENTING TESTING!!
20:34 the strict buttong is tested 
32:34 the order array is tested 
47:40 the game is tested to see if the quads flash
59:59 final testing done */

//Coded in order of how the Simon Game is played 

//STRICT BUTTON 
//'change' fires for <input> elements when an alteration to the element's value is committed by the user.
//.checked can only be used with checkboxes 
//CW to update this to a 'click' event in final project + change 'function' syntax
strictButton.addEventListener('change', (event) => {
    if (strictButton.checked == true) {
        strict = true;
    } else {
        strict = false; 
    }
});

//ON BUTTON 
onButton.addEventListener('click', (event) => {
    if(onButton.checked == true){
        on = true;
        turnCounter.innerHTML = "-"; //allows use to change the content of element so when a player turns the game on a line appears in score box  
    } else {
        on = false;
        turnCounter.innerHTML = ""; 
        clearColor(); //when turned off, call this function to turn off lights 
        clearInterval(intervalId); //see gameTurn() function below, so when 'onButton' = false (i.e. game is off), this clearInterval will stop running the gameTurn() function and therefore stop the flashing lights
    }
});  

//START BUTTON
startButton.addEventListener('click', (event) => {
    //if 'on' = true or if 'win' = true, then call the play function 
    if(on || win) {
        play();
    }
});

//define the play() function 
// to reset varibles at start of game 
function play () {
    win = false; //reset to false at start of game because player has not won yet
    order = []; //random order in which lights will flash, see for loop below 
    playerOrder = [];
    flash = 0; //reset to zero as no flashes at beginning of game play 
    intervalId = 0;
    turn = 1; //sets the count to one at the start of the game
    turnCounter.innerHTML = 1; //displays count of one in score box
    good = true; //player has not made any incorrect moves yet
    //for loop to fill 'order' array with random numbers up to 4, as there's 4 quadrants in the game 
    //for(initialize the variable, loop while i < 20, increment i)     
    for (var i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4 ) + 1); //push into the 'order' array, a random decimal but 'math.floor' will round it to a whole number 
    }
    compTurn = true; //game starts with computer flashing lights first which player must then math 
    
    //will run the gameTurn function every 800ms 
    //1000ms = 1 second 
    //this means the computer will flash a quadrant light every 800ms 
    intervalId = setInterval(gameTurn, 800); //setInterval calls a function after a certain amount of defined miliseconds, and repeats the execution of the function continuously, or until cleared with clearInterval set on the 'onButton'above
    //800ms is how long the quad will remain lit (i.e. the lenght of the flash)
}

//define the gameTurn() function 
function gameTurn() {
  on = false; //during this time lights are flashing so I want the game to appear off so player can't click anything 

//if the lights have flashed equals the turn count, then the computers turn is over 
  if (flash == turn) {
    clearInterval(intervalId); //stops the flashing lights (see above) 
    compTurn = false; //no longer the computers turn 
    clearColor(); //stops the color quadrants lighting up 
    on = true; //game is on so player can now press buttons 
  }

//if the computers turn is not over 
  if (compTurn) {
    clearColor(); //clears the color from last round of lights 
    //setTimeout() method calls a function or evaluates an expression after a specified number of milliseconds, the function is only executed once 
    setTimeout(() => {
    //'order' is an array and flash is the number of times a color quad flashed
    //flash starts at zero (zero is first item in the array), so if the first item in the array = 1, then execute the one() function  
      if (order[flash] == 1) one(); 
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++; //flash starts and zero and increments 
    }, 200); //function will wait 200ms before executing code in curly braces 
  }         //200ms is the lenght of time between quad flashes     
}

//define functions one() to four()
function one() {
    //if sound should be made 
  if (noise) {
      //then play the audio file 
    let audio = document.getElementById("clip1");
    audio.play();
  }
  //if noise is true then set the bg color of the top left quad 
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}

function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
}

function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}

//define the clearColor() function
//call this function to turn off lights (i.e. set quads back to darker shades)
function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}

//define the flashColor() function
//does the opposite of clearColor and makes the quads lighter colors 
function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

//programme the game so the player can click on the quad colors 
topLeft.addEventListener('click', (event) => {
  if (on) { //check if the game is on 
    playerOrder.push(1); //if game is on, then push 1 into the 'playerOrder' array 
    check(); //call the check()function to see if the playe is correct 
    one(); //call the one() function which plays the audio and lights up the quad onClick 
    if(!win) { //if the player has NOT won 
      setTimeout(() => { //then call setTimeout() function 
        clearColor(); //to call the clearColor() function 
      }, 300); //and clear the color after 300ms 
    }
  }
})

topRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

//define the check() function 
function check() {
    //[playerOrder.length - 1] is the last quad the player clicked 
    //if the quad that the player clicked does NOT equal the actual quad sequence 
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
  // then good equals flase means the plyer has not hit the correct color quad 
    good = false;

//CONDITION: if the player wins the game 
//if the player has copied the sequence 20 times AND good means they haven't missed any 
  if (playerOrder.length == 20 && good) {
    //then call the winGame() function   
    winGame();
  }

//CONDITION: if the player got the sequence wrong
  if (good == false) {
    flashColor();  //then call the flashColor() function to flash the light colors 
    turnCounter.innerHTML = "NO!"; //and display "NO!" in turn count display box 
    setTimeout(() => { //see definition of the setTimeout method above 
      turnCounter.innerHTML = turn; //sets the turnCounter back to the turn number 
      clearColor(); //call thr clearColor() function to change chnge the colors back to darks 

      if (strict) { //if in strict mode 
        play(); //call the play() function to start game from the start (this is why it's "strict")
      } else { //or else if not in strict mode 
        compTurn = true; //resart the round with the computers turn 
        flash = 0; //set the flash back to zero 
        playerOrder = []; 
        good = true; //player is good and starts fresh 
        intervalId = setInterval(gameTurn, 800); //sets the gameTurn to 800ms 
      }
    }, 800);

    noise = false; //play no noise if the player gets something wrong 
  }
  
//CONDITION: if the player is correct but has not won the game yet 
    //if it's the player turn and no mistakes but has NOT won 
  if (turn == playerOrder.length && good && !win) {
    turn++; //then move to the next turn 
    playerOrder = []; //clear the playerOrder array
    compTurn = true; //it is the computers turn
    flash = 0; //flash sequence returns to zero 
    turnCounter.innerHTML = turn; //display the count on the turnCounter display 
    intervalId = setInterval(gameTurn, 800); //sets the gameTurn to 800ms 
  }
}

//define the winGame() function for when a player wins the game 
function winGame() {
  flashColor(); //call the flashColor() function to flash the light colors 
  turnCounter.innerHTML = "WIN!"; //displays the word "WIN!" on the turnCounter display 
  on = false; //because on equals flase the player can't click anything 
  win = true; //win equals true because the player completed the sequence and won the game
}







