const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const backgroundImg = new Image();
backgroundImg.src = "Img/backgroundKitchen.jpg";

const basketImg = new Image();
basketImg.src = "Img/basket-png.png";

class Game {
  constructor(background, player) {
    this.background = background;
    this.player = player;
    this.animationId;
  }

  updateGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.background.move();
    this.background.draw();

    this.player.move();
    this.player.draw();

    this.animationId = requestAnimationFrame(this.updateGame);
  };
}

class Background {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 0;
  }

  // Queria que tivesse a opçao de  aumentar ou diminuir o speed do background img.
  // para ir para frente ou trás, mesmo que nesse caso eu va usar o speed zero nesse momento.
  //entao criei else if  na funcao caso eu queira usar outros fundos mutaveis.

  move() {
    this.y += this.speed;
    //    if(this.y <0 ) {
    //    this.y=canvas.height;
    //   }

    this.y %= canvas.height;
  }

  draw() {
    ctx.drawImage(backgroundImg, this.x, this.y, this.width, this.height);
    if (this.speed >= 0) {
      ctx.drawImage(
        backgroundImg,
        this.x,
        this.y - canvas.height,
        this.width,
        this.height
      );
    }
    if (this.speed < 0) {
      ctx.drawImage(
        backgroundImg,
        this.x,
        this.y + canvas.height,
        this.width,
        this.height
      );
    }
  }
}

class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 0;
  }
  move() {
    this.x += this.speed;

    if (this.x <= 0) {
      this.x = 0;
    }
    if (this.x >= canvas.width) this.x = canvas.width;
  }

  draw() {
    ctx.drawImage(basketImg, this.x, this.y, this.width, this.height);
  }
}

window.onload = () => {
  document.getElementById("startButton").onclick = () => {
    startGame();
  };

  function startGame() {
    const game = new Game(
      new Background(0, 0, canvas.width, canvas.height),
      new Player(canvas.width / 2, canvas.height - 200, 130, 130)
    );

    game.updateGame();
  }
};
