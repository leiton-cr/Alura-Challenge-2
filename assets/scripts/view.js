export default class View {
  /**
   * Boton de inicio de juego.
   */
  startGameBtn = document.getElementById("start_game");

  /**
   * Boton de agregar palabra.
   */
  addWordBtn = document.getElementById("add_word");

  /**
   * Boton de cancelar agregacion.
   */
  cancelAddBtn = document.getElementById("cancel_add");

  /**
   * Boton de guardar palabra.
   */
  saveWordBtn = document.getElementById("save_word");

  /**
   * Etiqueta de error de nueva palabra
   */
  newWordError = document.querySelector(".new_word_error");

  /**
   * Input de nueva palabra
   */
  newWordInput = document.querySelector(".new_word_input");

  /**
   * Boton de desistir
   */
  desistBtn = document.getElementById("desist_game");

  /**
   * Boton de reiniciar juego
   */
  resetBtn = document.getElementById("reset_game");


  /**
   * Canvas de dibujado
   */
  canvas = document.querySelector(".canvas");

  /**
   * Contexto del canvas
   */
  ctx = this.canvas.getContext("2d");
  

  /**
   *  Contenedor de letras de palabra
   */
  lettersContainer = document.querySelector(".letters");

  /**
   *  Contenedor de letras erroneas
   */
  errorsContainer = document.querySelector(".failetures");

  /**
   * Arreglo contenedor de pantallas de juego.
   */
  screens = [
    document.querySelector(".screen_zero"),
    document.querySelector(".screen_one"),
    document.querySelector(".screen_two"),
  ];

  /**
   * Varuabke de control de pantalla de juego actual.
   */
  actual = 0;

  constructor() {
    this.screens.forEach((screen) => {
      screen.addEventListener("animationend", (e) => {
        if (e.animationName !== "hide") return;

        screen.classList.add("hidden");
        screen.classList.remove("hide");
        this.swap();
      });
    });

   
  }

  /**
   * Este metodo oculta la pantalla actual para abrir una nueva
   * @param {Number} screen Pantalla por abrir
   */
  hide(screen) {
    this.screens[this.actual].classList.add("hide");
    this.actual = screen;
  }

  /**
   * Este metodo muestra la pantalla nueva.
   */
  swap() {
    this.screens[this.actual].classList.remove("hidden");
  }
}
