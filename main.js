let gameIsOn = false;
let score;
let livesLeft;
let fruits = [
  "apple",
  "banana",
  "cherries",
  "grapes",
  "mango",
  "orange",
  "peach",
  "pear",
  "pineapple",
  "watermelon",
];
let step;
let action;

// start reset button
$("#startreset").click(function () {
  //check if game is on
  //yes
  //reload
  if (gameIsOn === true) {
    location.reload();
  } else {
    // no
    gameIsOn = true;
    score = 0;
    $("#scorevalue").text(score);
    //show lives left
    $("#remaining-lives").show();
    livesLeft = 3;
    addLives();
    $("#gameover").hide();
    //change start button
    $("#startreset").text("Reset Game");
    startAction();
  }
});

function startAction() {
  $("#fruit1").show();
  selectedFruit();
  $("#fruit1").css({
    left: Math.round(Math.random() * 750),
    top: -50,
  });
  // define rand step
  step = Math.ceil(Math.random() * 5);
  //animate fruit every 10msec
  action = setInterval(function () {
    $("#fruit1").css("top", $("#fruit1").position().top + step);
    //check if to low
    if ($("#fruit1").position().top > $("#fruitbasket").height()) {
      //yes
      //any lives left
      //create new fruit
      //remove one live
      if (livesLeft > 1) {
        $("#fruit1").show();
        selectedFruit();
        $("#fruit1").css({
          left: Math.round(Math.random() * 750),
          top: -50,
        });
        step = 1 + Math.ceil(Math.random() * 5);
        livesLeft--;
        addLives();
      } //no
      //show game over
      //change reset button
      else {
        gameIsOn = false;
        $("#startreset").text("Start Game");
        $("#gameover").show();
        $("#gameover").html(`<p>game over</p><p>your score is: ${score}</p>`);
        $("#remaining-lives").hide();
        stopAction();
      }
    }
  }, 10);
}
//create rand fruit
function selectedFruit() {
  $("#fruit1").attr(
    "src",
    `/images/${fruits[Math.round(Math.random() * 9)]}.png`
  );
}

function addLives() {
  $("#remaining-lives").empty();
  for (let i = 0; i < livesLeft; i++) {
    $("#remaining-lives").append(`<img src="/images/life.png" class="life">`);
  }
}

function stopAction() {
  clearInterval(action);
  $("#fruit1").hide();
}

//slice fruit
// play sound
//explode fruit
$("#fruit1").mouseover(function () {
  score++;
  $("#scorevalue").text(score);
  $('#slicesound')[0].play();
  clearInterval(action);
  $("#fruit1").hide('explode', 500);
  setTimeout(startAction, 600);
  
});
