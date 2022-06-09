export default class Alerts {
  /**
   * Este metodo muestra un toast sencillo
   * @param {String} message Mensaje a mostrar
   * @param {String} icon Icono a mostrar
   */
  static SimpleToast(message, icon) {
    Swal.fire({
      toast: true,
      position: "top-right",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      text: message,
      icon: icon,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  }

  static PromiseNewGame() {
    return Swal.fire({
      heightAuto: false,
      title: "Atencion!",
      text: "¿Deseas iniciar un nuevo juego?",
      icon: "warning",
      iconColor: "#0a3871",
      showCancelButton: true,
      confirmButtonColor: "#0a3871",
      cancelButtonColor: "#dc143c",
      cancelButtonText: "No, continuar",
      confirmButtonText: "Si, nuevo juego",
    });
  }

  static PromiseEnd(state) {

    const title = state ? "Felicidades has ganado": "Lo sentimos no has ganado";
    const message = state ? "¿Deseas iniciar un nuevo juego?" : " ¿Deseas iniciar un nuevo juego?";
    const icon = state ? "success": "error";

    return Swal.fire({
      heightAuto: false,
      title: title,
      text: message,
      icon: icon,
      iconColor: "#0a3871",
      showCancelButton: true,
      confirmButtonColor: "#0a3871",
      cancelButtonColor: "#dc143c",
      cancelButtonText: "No, finalizar",
      confirmButtonText: "Si, nuevo juego",
    });
  }



}
