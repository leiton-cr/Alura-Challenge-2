export default class Game {
  /**
   * Palabra por jugar
   */
  word;

  /**
   * Errores cometidos
   */
  errors;

  /**
   * Aciertos del usuario
   */
  hits;

  constructor(word) {
    this.word = word;
   
    this.hits = [];
    this.errors = [];
    this.createHits();
  }

  /**
   * Este metodo llena el arreglo con espacios vacios.
   */
  createHits() {
    this.word.split("").forEach((letter) => {
      this.hits.push(" ");
    });
  }
}