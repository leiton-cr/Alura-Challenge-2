export default class Model {
  /**
   * Esta variable contiene un arreglo de palabras.
   */
  words;

  constructor() {
    this.words = this.loadWords();
  }

  /**
   * Este metodo obtiene las palabras agregadas al storage.
   * @returns Array de palabras
   */
  loadWords() {
    return JSON.parse(localStorage.getItem("Dictionary") || "[]");
  }

  /**
   * Este metodo agrega una palabra al storage.
   * @returns Boolean si se pudo agregar
   */
  addWord(word) {
    if (this.words.includes(word)) return false;

    this.words.push(word);
    localStorage.setItem("Dictionary", JSON.stringify(this.words));

    return true;
  }

  /**
   * Este metodo verifica una palabra en el storage.
   * @returns Boolean si existe
   */
  exists(word) {
    return this.words.includes(word);
  }

  /**
   * Obtiene una palabra aleatoria para jugar.
   * @returns String Palabra aleatoria
   */
  getRandomWord() {
    const index = Math.round(Math.random() * (this.words.length-1));
    return this.words[index];
  }
}
