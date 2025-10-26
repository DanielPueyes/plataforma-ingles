const colores = [
  { nombre: "Red", imagen: "assets/img/colores/red.png", sonido: "assets/audio/colores/red.wav" },
  { nombre: "Blue", imagen: "assets/img/colores/blue.png", sonido: "assets/audio/colores/blue.wav" },
  { nombre: "Green", imagen: "assets/img/colores/green.png", sonido: "assets/audio/colores/green.wav" },
  { nombre: "Yellow", imagen: "assets/img/colores/yellow.png", sonido: "assets/audio/colores/yellow.wav" },
  { nombre: "Orange", imagen: "assets/img/colores/orange.png", sonido: "assets/audio/colores/orange.wav" },
  { nombre: "Purple", imagen: "assets/img/colores/purple.png", sonido: "assets/audio/colores/purple.wav" },
  { nombre: "Pink", imagen: "assets/img/colores/pink.png", sonido: "assets/audio/colores/pink.wav" },
  { nombre: "Brown", imagen: "assets/img/colores/brown.png", sonido: "assets/audio/colores/brown.wav" },
  { nombre: "White", imagen: "assets/img/colores/white.png", sonido: "assets/audio/colores/white.wav" },
  { nombre: "Black", imagen: "assets/img/colores/black.png", sonido: "assets/audio/colores/black.wav" }
];

const preguntaTexto = document.getElementById("texto-pregunta");
const imagenColor = document.getElementById("imagen-color");
const opcionesDiv = document.getElementById("opciones");
const resultado = document.getElementById("resultado");

let colorCorrecto = null;
let audioActual = null;

// 🔊 Función para reproducir el sonido
function reproducirSonido(ruta) {
  if (audioActual) {
    audioActual.pause();
    audioActual.currentTime = 0;
  }
  audioActual = new Audio(ruta);
  audioActual.play();
}

// 🧩 Generar nueva pregunta
function generarPregunta() {
  resultado.textContent = "";

  const indice = Math.floor(Math.random() * colores.length);
  colorCorrecto = colores[indice];

  imagenColor.src = colorCorrecto.imagen;
  imagenColor.alt = colorCorrecto.nombre;

  // 🔊 Reproducir sonido del color mostrado
  reproducirSonido(colorCorrecto.sonido);

  // 🖱️ Permitir que el niño haga clic en la imagen para repetir el sonido
  imagenColor.onclick = () => reproducirSonido(colorCorrecto.sonido);

  // Mezclar opciones
  const opcionesMezcladas = colores
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  if (!opcionesMezcladas.includes(colorCorrecto)) {
    opcionesMezcladas[Math.floor(Math.random() * 4)] = colorCorrecto;
  }

  opcionesDiv.innerHTML = "";
  opcionesMezcladas.forEach(color => {
    const boton = document.createElement("button");
    boton.textContent = color.nombre;
    boton.classList.add("tarjeta");
    boton.onclick = () => verificarRespuesta(color.nombre);
    opcionesDiv.appendChild(boton);
  });
}

// ✅ Verificar respuesta
function verificarRespuesta(respuesta) {
  if (respuesta === colorCorrecto.nombre) {
    resultado.textContent = "✅ Correct!";
    resultado.style.color = "green";
  } else {
    resultado.textContent = `❌ Wrong! It was ${colorCorrecto.nombre}.`;
    resultado.style.color = "red";
  }

  // Nueva pregunta después de 2 segundos
  setTimeout(generarPregunta, 2000);
}

// ▶️ Iniciar test
generarPregunta();

