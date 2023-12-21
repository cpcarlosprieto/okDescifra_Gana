// Arreglo que contiene las palabras para jugar
let arrayPalabras = [
  "VARIABLE",
  "FUNCION",
  "ALGORITMO",
  "HTML",
  "CSS",
  "JAVASCRIPT",
  "DATABASE",
  "FRONTEND",
  "BACKEND",
  "CODIGO",
  "FRAMEWORK",
  "PYTHON",
  "JAVA",
  "API",
  "INTERNET",
  "COMPUTADORA",
  "CULTURA",
  "HISTORIA",
  "CIENCIA",
  "MATEMATICAS",
];

// Arreglo que contiene las ayudas de cada palabra
let ayudas = [
  "Elemento de programación",
  "Bloque de código reutilizable",
  "Secuencia de pasos",
  "Lenguaje de marcado para la web",
  "Estilo para la web",
  "Lenguaje de programación para el navegador",
  "Almacenamiento de información",
  "Interfaz de usuario",
  "Lógica del servidor",
  "Instrucciones para la computadora",
  "Entorno de desarrollo",
  "Lenguaje de programación versátil",
  "Lenguaje de programación popular",
  "Interfaz de programación de aplicaciones",
  "Red global de computadoras",
  "Dispositivo de procesamiento de información",
  "Conocimiento y costumbres",
  "Registro y narración del pasado",
  "Estudio del mundo natural",
  "Disciplina de números y formas",
];

// Variable que guarda la cantidad de palabras ya jugadas
let cantPalabrasJugadas = 0;

// Variable que guarda la cantidad de intentos restantes
let intentosRestantes = 4;

// Variable que guarda el índice de la palabra actual
let posActual;

// Arreglo que contiene la palabra actual con la que estoy jugando
let arrayPalabraActual = [];

// Cantidad de letras acertadas por cada jugada
let cantidadAcertadas = 0;

// Arreglo que guarda cada letra en divs
let divsPalabraActual = [];

// Cantidad de palabras que debe acertar en cada jugada.
let totalQueDebeAcertar;

// Función que carga la palabra nueva para jugar
function cargarNuevaPalabra() {
  // Aumento en uno cantidad de palabras jugadas y controlo si llego a su límite
  cantPalabrasJugadas++;
  if (cantPalabrasJugadas > arrayPalabras.length) {
    // Volvemos a cargar el arreglo original
    arrayPalabras = [
      "VARIABLE",
      "FUNCION",
      "ALGORITMO",
      "HTML",
      "CSS",
      "JAVASCRIPT",
      "DATABASE",
      "FRONTEND",
      "BACKEND",
      "CODIGO",
      "FRAMEWORK",
      "PYTHON",
      "JAVA",
      "API",
      "INTERNET",
      "COMPUTADORA",
      "CULTURA",
      "HISTORIA",
      "CIENCIA",
      "MATEMATICAS",
    ];
    ayudas = [
      "Elemento de programación",
      "Bloque de código reutilizable",
      "Secuencia de pasos",
      "Lenguaje de marcado para la web",
      "Estilo para la web",
      "Lenguaje de programación para el navegador",
      "Almacenamiento de información",
      "Interfaz de usuario",
      "Lógica del servidor",
      "Instrucciones para la computadora",
      "Entorno de desarrollo",
      "Lenguaje de programación versátil",
      "Lenguaje de programación popular",
      "Interfaz de programación de aplicaciones",
      "Red global de computadoras",
      "Dispositivo de procesamiento de información",
      "Conocimiento y costumbres",
      "Registro y narración del pasado",
      "Estudio del mundo natural",
      "Disciplina de números y formas",
    ];
  }

  // Selecciono una posición aleatoria
  posActual = Math.floor(Math.random() * arrayPalabras.length);

  // Tomamos la palabra nueva
  const palabra = arrayPalabras[posActual];

  // Cantidad de letras que tiene esa palabra
  totalQueDebeAcertar = palabra.length;

  // Coloco en 0 la cantidad acertadas hasta el momento
  cantidadAcertadas = 0;

  // Guardamos la palabra que está en formato string en un arreglo
  arrayPalabraActual = palabra.split("");

  // Limpiamos los contenedores que quedaron cargadas con la palabra anterior
  document.getElementById("palabra").innerHTML = "";
  document.getElementById("letrasIngresadas").innerHTML = "";

  // Cargamos la cantidad de divs (letras) que tiene la palabra
  for (let i = 0; i < palabra.length; i++) {
    const divLetra = document.createElement("div");
    divLetra.className = "letra";
    document.getElementById("palabra").appendChild(divLetra);
  }

  // Selecciono todos los divs de la palabra
  divsPalabraActual = document.getElementsByClassName("letra");

  // Seteamos los intentos
  intentosRestantes = 4;
  document.getElementById("intentos").innerHTML = intentosRestantes;

  // Cargamos la ayuda de la pregunta
  document.getElementById("ayuda").innerHTML = ayudas[posActual];

  // Elimino el elemento ya seleccionado del arreglo.
  // splice(posActual,1): A partir de la posición posActual elimino 1 elemento
  arrayPalabras.splice(posActual, 1);
  ayudas.splice(posActual, 1);
}

// Llamada para cargar la primera palabra del juego
cargarNuevaPalabra();

// Detecto el evento de entrada de texto en tiempo real
document
  .getElementById("inputLetra")
  .addEventListener("keyup", verificarCadenaEnTiempoReal);

// Función que verifica la cadena ingresada en tiempo real
function verificarCadenaEnTiempoReal() {
  const inputLetra = document.getElementById("inputLetra");
  const cadenaIngresada = inputLetra.value.trim().toUpperCase();

  if (cadenaIngresada && contieneSoloLetras(cadenaIngresada)) {
    // Llama a la función que verifica la cadena
    verificarCadenaJuego(cadenaIngresada);
    // Limpia el campo de entrada después de verificar
    inputLetra.value = "";
  }
}

// Función para verificar la cadena ingresada
function verificarCadenaJuego(cadena) {
  // Controlo si la cadena presionada ya ha sido ingresada
  let letrasIngresadas = document.getElementById("letrasIngresadas").innerHTML;
  letrasIngresadas = letrasIngresadas.split("");

  for (let i = 0; i < cadena.length; i++) {
    const letra = cadena[i];

    if (!letrasIngresadas.includes(letra)) {
      let acerto = false;

      for (let j = 0; j < arrayPalabraActual.length; j++) {
        if (arrayPalabraActual[j] === letra) {
          divsPalabraActual[j].innerHTML = letra;
          acerto = true;
          cantidadAcertadas++;

          if (totalQueDebeAcertar === cantidadAcertadas) {
            for (let k = 0; k < arrayPalabraActual.length; k++) {
              divsPalabraActual[k].className = "letra pintar";
            }
          }
        }
      }

      if (!acerto) {
        intentosRestantes--;
        document.getElementById("intentos").innerHTML = intentosRestantes;

        if (intentosRestantes <= 0) {
          for (let k = 0; k < arrayPalabraActual.length; k++) {
            divsPalabraActual[k].className = "letra pintarError";
          }
        }
      }

      document.getElementById("letrasIngresadas").innerHTML += letra + " - ";
    }
  }
}

// Función para determinar si una cadena contiene solo letras
function contieneSoloLetras(cadena) {
  return /^[a-zA-Z]+$/.test(cadena);
}
