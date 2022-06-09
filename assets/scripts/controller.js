import Alerts from "./alerts.js";
import Game from "./game.js";
import Model from "./model.js";
import View from "./view.js";

export default class Controller {
  view;
  model;
  game;

  newWordValid = false;

  constructor() {
    this.view = new View();
    this.model = new Model();
    this.addListeners();
  }

  /**
   * Este metodo cambia a la ventana de nuevo juego
   * @param {Event} e
   * @returns
   */
  startGameSwap(e) {
    if (this.model.words.length === 0) {
      return Alerts.SimpleToast("No hay palabras registradas", "warning");
    }

    this.startNewGame();
    this.view.hide(2);
  }

  /**
   * Este metodo cambia a la ventana de agregar palabras
   * @param {Event} e
   */
  addWordSwap(e) {
    this.view.hide(1);
  }

  /**
   * Este metodo retorna a la ventana de inicio
   * @param {Event} e
   */
  cancelAddSwap(e) {
    this.view.hide(0);
  }

  /**
   * Este metodo retorna a la ventana de inicio
   * @param {Event} e
   */
  validateWord(e) {
    this.newWordValid = false;
    this.view.newWordInput.value = this.view.newWordInput.value.toUpperCase();

    if (this.view.newWordInput.value.length > 8) {
      return (this.view.newWordError.innerText = "Máx. 8 letras");
    }

    if (this.view.newWordInput.value.length < 3) {
      return (this.view.newWordError.innerHTML = "Min. 3 letras");
    }

    if (this.model.exists(this.view.newWordInput.value)) {
      return (this.view.newWordError.innerText = "Palabra ya guardada");
    }

    this.newWordValid = true;
  }

  /**
   * Este metodo envia a la ventana principal luego de que el usuario desiste
   * @param {Event} e
   */
  desistGameSwap(e) {
    this.game = undefined;
    this.view.hide(0);
  }

  /**
   * Este metodo envia a la ventana de nuevo juego luego de guardar una palabra
   * @param {Event} e
   */
  saveWordSwap(e) {
    this.validateWord(e);

    if (!this.newWordValid)
      return Alerts.SimpleToast("Errores en la palabra", "warning");

    this.model.addWord(this.view.newWordInput.value);

    this.startNewGame();
    this.view.hide(2);
  }

  /**
   * Este metodo realiza los reinicios necesarios para un nuevo juego
   */
  startNewGame() {
    const randomWord = this.model.getRandomWord();
    this.game = new Game(randomWord);
    this.view.lettersContainer.innerHTML = "";
    this.view.ctx.clearRect(0, 0, this.view.canvas.width, this.view.canvas.height);

    this.setHits();
    this.setErrors();
  }

  /**
   * Este metodo muestra los errores cometidos en pantalla
   */
  setErrors() {
    this.validateWon();

    this.view.errorsContainer.innerHTML = "";

    this.game.errors.forEach((letter) => {
      this.view.errorsContainer.innerHTML += ` <i> ${letter} </i> `;
    });
  }

  /**
   * Este metodo muestra los aciertos en pantalla
   */
  setHits() {
    this.validateWon();

    this.view.lettersContainer.innerHTML = "";

    this.game.hits.forEach((letter) => {
      this.view.lettersContainer.innerHTML += `<div class="letter"> <i>${letter}</i> </div>`;
    });
  }

  /**
   * Este metodo sirve para verificar si el juego se ganó o perdió
   */
  validateWon() {
    if (this.game.errors.length > 9) {
      Alerts.PromiseEnd(false).then((result) => {
        if (result.isConfirmed) {
          this.startNewGame();
        } else {
          this.desistGameSwap();
        }
      });

      return;
    }

    if (this.game.hits.join("") === this.game.word) {
      Alerts.PromiseEnd(true).then((result) => {
        if (result.isConfirmed) {
          this.startNewGame();
        } else {
          this.desistGameSwap();
        }
      });
      return;
    }
  }

  /**
   * Este metodo sirve para validar las teclas presionadas
   */
  validatePressed(e) {
    if (!this.game) return;
    const key = e.key.toUpperCase();

    if (e.keyCode < 65 || e.keyCode > 90) {
      Alerts.SimpleToast("Solo letras permitidas", "warning");
      return;
    }

    if (this.game.errors.includes(key)) {
      Alerts.SimpleToast("Letra ya registrada", "warning");
      return;
    }

    if (!this.game.word.includes(key)) {
      Alerts.SimpleToast("No existe", "warning");
      this.drawError();
      this.game.errors.push(key);
      this.setErrors();
      return;
    }

    this.game.hits.forEach((letter, i) => {
      if (this.game.word[i] === key) {
        this.game.hits[i] = key;
      }
    });

    this.setHits();
  }

  addListeners() {
    this.view.startGameBtn.addEventListener("click", (e) => {
      this.startGameSwap(e);
    });

    this.view.addWordBtn.addEventListener("click", (e) => this.addWordSwap(e));

    this.view.cancelAddBtn.addEventListener("click", (e) =>
      this.cancelAddSwap(e)
    );

    this.view.saveWordBtn.addEventListener("click", (e) =>
      this.saveWordSwap(e)
    );

    this.view.newWordInput.addEventListener("input", (e) =>
      this.validateWord(e)
    );

    this.view.desistBtn.addEventListener("click", (e) => {
      this.desistGameSwap(e);
    });

    this.view.resetBtn.addEventListener("click", (e) => {
      Alerts.PromiseNewGame().then((result) => {
        if (result.isConfirmed) {
          this.startNewGame(e);
        }
      });
    });

    document.addEventListener("keydown", (e) => {
      this.validatePressed(e);
    });
  }

  drawError() {
    const error = this.game.errors.join("").length;
    
    const ctx = this.view.ctx;

    switch (error) {
      case 0:
        ctx.moveTo(5, this.view.canvas.height - 15);
        ctx.lineTo(this.view.canvas.width - 5, this.view.canvas.height - 15);
        break;

      case 1:
        ctx.moveTo(45, this.view.canvas.height - 15);
        ctx.lineTo(45, 15);
        break;

      case 2:
        ctx.moveTo(45, 15);
        ctx.lineTo(this.view.canvas.width - 65, 15);
        break;

      case 3:
        ctx.moveTo(this.view.canvas.width - 65, 15);
        ctx.lineTo(this.view.canvas.width - 65, 45);
        break;

      case 4:
        ctx.moveTo(this.view.canvas.width - 65, 45);
        ctx.beginPath();
        ctx.arc(this.view.canvas.width - 65, 55, 10, 0, 2 * Math.PI);
        break;

      case 5:
        ctx.moveTo(this.view.canvas.width - 65, 65);
        ctx.lineTo(this.view.canvas.width - 65, 95);
        break;

      case 6:
        ctx.moveTo(this.view.canvas.width - 65, 65);
        ctx.lineTo(this.view.canvas.width - 85, 80);
        break;

      case 7:
        ctx.moveTo(this.view.canvas.width - 65, 65);
        ctx.lineTo(this.view.canvas.width - 45, 80);
        break;

      case 8:
        ctx.moveTo(this.view.canvas.width - 65, 95);
        ctx.lineTo(this.view.canvas.width - 45, 105);
        break;

      case 9:
        ctx.moveTo(this.view.canvas.width - 65, 95);
        ctx.lineTo(this.view.canvas.width - 85, 105);
        break;

      default:
        break;
    }

    ctx.stroke();
  }
}
