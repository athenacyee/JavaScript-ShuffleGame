document.querySelector('#Again').addEventListener('click',start);
document.querySelector('#reset').addEventListener('click',restart)
start();

let lastGuessed = -1;
let won = 0;
let lost = 0;

function restart(){
  won = 0;
  lost = 0;
  start();
  setScore();
}

function setScore() {
    document.querySelector("#won_times").innerHTML = 'Won: ' + won;
    document.querySelector("#won_times").style.color = "Green";
    document.querySelector("#lost_times").innerHTML = 'Lost: ' + lost;
    document.querySelector("#lost_times").style.color = "red";
}

function start(){
  const images = ["img/blank2.png", "img/blank.png", "img/blank1.png"];

  $("#cards").html(
    _.shuffle(images).map((image, index) => `<img id="card${index}" src="${image}"/>`)
  );

  images.forEach((image, index) => {
    $('#card' + index).on('click', () => {
      lastGuessed = index;
      shuffleCards();
    });
  });
}

function shuffleCards(){
  const images = ["img/star.png", "img/blank.png", "img/blank1.png"];

  const shuffledImages = _.shuffle(images);
  $("#cards").html(
    shuffledImages.map((image, index) => {
      return `<img src="${image}"/>`;
    })
  );

  for(let i = 0; i < shuffledImages.length; i++ ){
    if (shuffledImages[i] === images[0] && i === lastGuessed) {
        $(`#message`).html("You Won!!");
        $(`#message`).attr("class","bg-transparent text-success");
        won = won +1;
        break;
      } else if (i === lastGuessed) {
        $(`#message`).html("You Lost!!");
        $(`#message`).attr("class","bg-transparent text-danger");
        lost++;
      }
    
  }
  setScore();
}

