const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bgImg = new Image();
bgImg.src = "images/bg.png";

const basketImg = new Image();
basketImg.src = "images/cesta.png";

const eggImg = new Image();
eggImg.src = "images/egg.png";

const bombImg = new Image();
bombImg.src = "images/bomb_PNG16.png";

class Component {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  isCrashedWith(obstacle) {
    const condition = !(
      this.bottom() < obstacle.top() ||
      this.top() + 55 > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );

    return condition;
  }

  isCrashedWithFloor(obstacle) {
    const condition2 = !(this.bottom < canvas.height);
  }
}

class Obstacle extends Component {
  move() {
    this.y += this.speed;

    if (this.x <= 0) {
      this.x = 0;
    }
    if (this.x >= canvas.width - 127) {
      this.x = canvas.width - 127;
    }
  }

  drawEgg() {
    ctx.drawImage(eggImg, this.x, this.y, this.width, this.height);
  }
  drawBomb() {
    ctx.drawImage(bombImg, this.x, this.y, this.width, this.height);
  }
}

class Game {
  constructor(background, player) {
    this.background = background;
    this.player = player;
    this.animationId;
    this.obstacles = [];
    this.frames = 0;
    this.score = 0;
  }

  updateGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.background.move();
    this.background.draw();

    this.player.move();
    this.player.draw();

    this.updateObstacles();

    this.checkBatida();

    this.animationId = requestAnimationFrame(this.updateGame);
  };

  updateObstacles = () => {
    this.frames++;

    if (this.frames % 30 === 0) {
      this.score++;
    }

    this.obstacles.map((obstacle) => {
      obstacle.move();
      obstacle.drawEgg();
    });

    if (this.frames % 70 === 0) {
      let y = 0;

      let minX = 20;
      let maxX = canvas.width - 147;
      let x = Math.floor(Math.random() * (maxX - minX + 1) + minX);

      //let minGap = 50;
      //let maxGap = 200;
      //let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

      const eggObstacle = new Obstacle(x, y, 50, 50, 3);

      this.obstacles.push(eggObstacle);
    }
  };

  checkBatida() {
    const crashed = this.obstacles.some((obstacle) => {
      return this.player.isCrashedWith(obstacle);
    });

    if (crashed) {
      this.score++;
      alert("pegou o ovo!");
    }
  }

  checkBatidaChao() {
    const crashed2 = this.obstacles.some((obstacle) => {
      return this.eggObstacle.isCrashedWithFloor(obstacle);
    });
    if (crashed2) {
      alert("perdeu");
    }
  }
}

class Background {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 0;
  }

  move() {
    this.y += this.speed;
    if (this.y >= canvas.height) {
      this.y = 0;
    }
    //else if (this.y < canvas.height) {
    //this.y = 0;
    //}
  }

  draw() {
    ctx.drawImage(bgImg, this.x, this.y, this.width, this.height);

    if (this.speed >= 0) {
      ctx.drawImage(
        bgImg,
        this.x,
        this.y - canvas.height,
        this.width,
        this.height
      );
    } else if (this.speed < 0) {
      ctx.drawImage(
        bgImg,
        this.x,
        this.y + canvas.height,
        this.width,
        this.height
      );
    }
  }
}

class Player extends Component {
  move() {
    this.x += this.speed;
    if (this.x <= 0) {
      this.x = 0;
    }
    if (this.x >= canvas.width - 127) {
      this.x = canvas.width - 127;
    }
  }

  draw() {
    ctx.drawImage(basketImg, this.x, this.y, this.width, this.height);
  }
}

window.onload = () => {
  document.getElementById("start-btn").onclick = () => {
    startGame();
  };

  function startGame() {
    const game = new Game(
      new Background(0, 0, canvas.width, canvas.height),
      new Player(canvas.width / 2 - 65, canvas.height - 130, 130, 130, 0)
    );

    game.updateGame();

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        game.player.speed = -4;
      }
      if (event.key === "ArrowRight") {
        game.player.speed = 4;
      }
    });

    document.addEventListener("keyup", () => {
      game.player.speed = 0;
    });
  }
};
